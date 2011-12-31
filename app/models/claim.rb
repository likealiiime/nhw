class Claim < ActiveRecord::Base
  belongs_to  :customer
  has_one     :repair
  has_one     :contractor, :through => :repair
  belongs_to  :property, :class_name => "Address", :foreign_key => 'address_id'
  
  named_scope :between_dates, lambda { |from, till| { :conditions => { :created_at => from .. till }, :order => "created_at DESC" } }
  
  def self.statuses_json
    i = -1
    "{" << self.statuses.collect { |k,v| "\"#{k}\":#{v}" }.join(',') << "}"
  end
  
  def self.statuses
    [
      ['Not Set', 0], ['Placed by Agent', 1], ['Placed by Customer', 2], ['Waiting for Contract', 3],
      ['Contractor Dispatched', 4], ['Re-Dispatched', 13], ['Contractor Reported', 5], ['Approved', 6], 
      ['Denied', 7], ['Paid', 12], ['Need More Info.', 8], ['Customer Contacted', 9], ['Sent Release', 10],
      ['Received Release', 11]
    ]
  end
  
  def date
    self.created_at || Time.at(self.claim_timestamp.to_i).utc
  end
  
  def status
    Claim.statuses.rassoc(self.status_code)[0] || "Unknown Status!"
  end
  
  def summary
    coverages = []
    (self.standard_coverage || '').split(', ').each do |coverage_id|
      coverages << Coverage.find(coverage_id).coverage_name
    end
    return coverages.join(', ')
  end
  
  def text
    (self.claim_text || '').gsub(/\n/, '<br/>')
  end
  
  def truncated_summary(length=20)
    s = self.claim_text || ''
    unless s.empty?
      s = s[0...length]
      s << '...' if self.claim_text.length > length
    end
    return s
  end
  
  def notification_summary
    "Claim for #{self.customer.notification_summary} - #{self.truncated_summary}"
  end
  
  def edit_url
    self.customer ? (self.customer.edit_url << '#claims') : ''
  end
  
  def address
    return self.property if self.property
    return self.customer.first_property if self.customer
    return Address.bad_address_for(self)
  end
  
  def claim_number
    customer_id = self.customer.nil? ? 'NOCUSTOMER' : self.customer.contract_number
    "#{customer_id}-#{self.id}"
  end
  
  def to_json(a=nil,b=nil)
    {
      :id => self.id,
      :claim_number => self.claim_number,
      :status => self.status,
      :status_code => self.status_code,
      :date => self.date.in_time_zone(EST).strftime("%m/%d/%y %I:%M %p"),
      :text => self.text,
      :repair => self.repair,
      :property => self.address.to_s,
      :property_lat => self.address.lat,
      :property_lng => self.address.lng,
      :agent_name => self.agent_name,
      :updated => self.updated_at ? self.updated_at.in_time_zone(EST).strftime("%m/%d/%y %I:%M %p") : '',
      :customer_id => self.customer_id,
      :summary => self.truncated_summary(75)
    }.to_json
  end
end
