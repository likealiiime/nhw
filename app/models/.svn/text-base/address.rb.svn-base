class Address < ActiveRecord::Base
  # polymorphic relationship
  belongs_to                    :addressable,       :polymorphic => true
  
  named_scope :of_contractors_with_zip_code, lambda { |z|
    { :conditions => { :zip_code => z, :addressable_type => 'Contractor' } }
  }
  
  named_scope :of_contractors_within_radius_of_lat_lng, lambda { |radius, lat, lng|
    # Adapted from http://joshhuckabee.com/simple-zip-code-perimeter-search-rails
    # ----------------------------------------------------------------------
    # returns a collection of zip codes that are within the specified
    # radius (in miles) of the given search zip code
    # ----------------------------------------------------------------------
    latitude_miles = 69.172  #this is constant
    #longitude miles varies based on latitude, that is calculated here
    longitude_miles = (latitude_miles * Math.cos(lat * (Math::PI/180))).abs
    latitude_degrees = radius/latitude_miles  #radius in degrees latitude
    longitude_degrees = radius/longitude_miles  #radius in degrees longitude

    #now set min and max lat and long accordingly
    min_latitude = lat - latitude_degrees
    max_latitude = lat + latitude_degrees
    min_longitude = lng - longitude_degrees
    max_longitude = lng + longitude_degrees

    distance_formula = "SQRT(POW(#{latitude_miles} * (lat - #{lat}), 2) + POW(#{longitude_miles} * (lng - #{lng}), 2))"
    #now find all zip codes that are within 
    #these min/max lat/long bounds and return them
    #weed out any zip codes that fall outside of the search radius
    { 
      :select => Address.columns.collect(&:name).join(', ') << ", #{distance_formula} AS distance",
      :conditions =>
        "addressable_type = 'Contractor' AND " <<
        "(lat BETWEEN #{min_latitude} AND #{max_latitude}) AND " <<
        "(lng BETWEEN #{min_longitude} AND #{max_longitude}) AND " <<
        "#{distance_formula} <= #{radius}",
      :order => 'distance'
    }
  }
  
  def self.bad_address_for(record)
    Address.new({
      :address => "Bad address for invalid #{record.class.to_s} ##{record.id}",
      :city => 'Nowhere', :state => 'KS', :zip_code => '00000',
      :lat => 0.0, :lng => 0.0,
      :addressable_type => record.class.to_s, :addressable_id => record.id
    })
  end
  
  def duplicate_for_addressable!(object)
    attrs = self.attributes.dup
    attrs.delete(:id)
    attrs[:addressable_type]  = object.class.to_s
    attrs[:addressable_id]    = object.id
    new_address = Address.create(attrs)
  end
  
  def edit_url
    self.addressable.edit_url
  end
  
  def notification_summary
    "#{self.addressable_type} #{self.address_type} Address #{self.short_form}"
  end
  
  # display methods
  def city_state
    return [self.city, self.state].join(", ")
  end
  
  def city_state_zip
    return [self.city_state, self.zip_code].join(" ")
  end
  
  def short_form
    [self.address, self.address2, self.address3, self.city_state_zip].join(" ")
  end
  alias to_s short_form
  
  def to_hash
    {
      :id => self.id,
      :string => self.to_s,
      :address => self.address,
      :address2 => self.address2,
      :address3 => self.address3,
      :city => self.city,
      :state => self.state,
      :zip_code => self.zip_code,
      :address_type => self.address_type,
      :verified => self.verified?,
      :lat => self.lat,
      :lng => self.lng,
      :geocoded => self.geocoded?
    }
  end
  
  def to_json(one=nil, two=nil)
    self.to_hash.to_json
  end
  
  def geocode
    response = ''
    begin
      SystemTimer.timeout(5.seconds) {
        response = Net::HTTP.get(URI.parse("http://tinygeocoder.com/create-api.php?q=#{CGI::escape(self.to_s)}"))
      }
      unless response.empty? # Check for failed geocode
        if response =~ /^(-?\d+?\.\d+?),(-?\d+?\.\d+?)$/ # Check for non lat,lng responses
          self.lat = $1.to_f
          self.lng = $2.to_f
          self.geocoded_address = self.to_s
        end
      end
    rescue Timeout::Error
      self.remove_geocode
    rescue
      self.remove_geocode
    end
  end
  
  def Address.ups_request(request)
    https = Net::HTTP.new($AVS_URL.host, $AVS_URL.port)
    https.use_ssl = true; https.verify_mode = OpenSSL::SSL::VERIFY_NONE
    xml = Document.new
    response_body = ''
    begin
      SystemTimer.timeout(5.seconds) {
        https.request_post($AVS_URL.path, request) { |response|
          response_body = response.class == Net::HTTPOK ? response.body : $AVS_FAILURE_RESPONSE
        }
      }
    rescue
      puts $!
      response_body = $AVS_FAILURE_RESPONSE
    ensure
      puts response_body
      xml = Document.new(response_body)
      error_code = xml.root.elements['Response'].elements['ResponseStatusCode'].text.to_i
      return xml, error_code
    end
  end
  
  def remove_geocode
    self.lat = nil
    self.lng = nil
    self.geocoded_address = nil
  end
  
  def geocoded?
    self.lat && self.lng && self.geocoded_address == self.to_s
  end
  alias geocoded geocoded?
  
  def verified=(is_verified)
    self.verified_address = is_verified ? self.to_s : nil
  end
  
  def verified?
    self.verified_address == self.to_s
  end
  alias verified verified?
  
  def verify
    request = <<-XML
    #{$AVS_ACCESS_REQUEST}
    <AddressValidationRequest xml:lang="en-US"> 
      <Request> 
        <TransactionReference> 
          <CustomerContext>#{self.id}</CustomerContext> 
          <XpciVersion>1.0001</XpciVersion> 
        </TransactionReference> 
        <RequestAction>AV</RequestAction> 
      </Request> 
      <Address>
    XML
    if self.city and not self.city.empty? then request << "<City>#{self.city}</City>" end
    if self.state and not self.state.empty? then request << "<StateProvinceCode>#{self.state}</StateProvinceCode>" end
    if self.zip_code and not self.zip_code.empty? then request << "<PostalCode>#{self.zip_code}</PostalCode>" end
    request << "</Address></AddressValidationRequest>"
    xml, error_code = Address.ups_request(request)
    if error_code == 1
      # Only accept the first result, and it has to be an exact match
      result = XPath.first(xml, '//AddressValidationResult')
      self.verified = result.elements['Quality'].text.to_f == 1.0
    end
  end
  
  def lat_lng
    LngLat.new(self.lng, self.lat) if self.geocoded?
  end
  
  def distance_to(dest)
    return self.lat_lng.mi_distance_to(dest.lat_lng) if self.geocoded? and dest.geocoded?
  end
  
  protected
  
  def before_save
    begin
      self.verify unless self.verified?
    rescue
      #logger.info("Could not verify Address ##{self.id} because: #{$!}")
      self.verified = false
    end
    
    begin
      self.geocode unless self.geocoded?
    rescue
      #logger.info("Could not geocode Address ##{self.id} because: #{$!}")
      self.remove_geocode
    end
    
    return true
  end
end
