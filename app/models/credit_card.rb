class CreditCard < ActiveRecord::Base
  belongs_to :customer
  belongs_to :address
  
  validates_presence_of :first_name, :last_name
  validates_format_of :number, :with => /^\d{13,18}$/
  #validates_format_of :cvc, :with => /^\d+$/
  validates_numericality_of :month, :only_integer => true
  validates_numericality_of :year, :only_integer => true
  
  attr_accessor :cvc
  attr :number
  
  def exp_date=(string)
    to_year = Proc.new { |s| s.to_s.length == 2 ? s.to_i + 2000 : s.to_i }
    self.month = 1
    self.year  = 2099
    if string =~ /^(\d{4})[\/-](\d{1,2})/
      self.month = $2.to_i
      self.year  = to_year[$1]
    elsif string =~ /^(\d{1,2})[\/-](\d{4})/
      self.month = $1.to_i
      self.year  = to_year[$2]
    elsif string =~ /^(\d{1,2})\/?-?(\d{2,4})/
      self.month = $1.to_i
      self.year  = to_year[$2]
    end
  end
  
  def exp_date
    "#{self.month}/#{self.year}"
  end
  
  def charge_cents!(cents)
    gateway = ActiveMerchant::Billing::AuthorizeNetGateway.new(:login => "9GGq7aT6bBD", :password => "3p4TezfV87Jj59da")
    response = nil
    
    SystemTimer.timeout(120.seconds) {
      response = gateway.purchase(cents, self.to_am_creditcard, {
        :order_id      => self.customer.contract_number[1..-1],
        :cust_id       => self.customer.contract_number[1..-1],
      }.merge(self.am_billing_address_hash))
    }
    return response
  end
  
  def number
    return '' if not self.crypted_number
    cipher = Crypt::Rijndael.new(self.key)
    @number = cipher.decrypt_string(Base64.decode64(self.crypted_number))
    return @number
  end
  
  def number=(new_number)
    return if new_number.nil? or new_number.empty?
    @number = new_number
    self.last_4 = new_number[-4..-1]
    cipher = Crypt::Rijndael.new(self.key)
    self.crypted_number = Base64.encode64(cipher.encrypt_string(new_number))
  end
  
  def to_am_creditcard
    ActiveMerchant::Billing::CreditCard.new({
      :number   => self.number,
      :month    => self.month,
      :year     => self.year,
      :first_name => self.first_name,
      :last_name  => self.last_name#,
      #:verification_value => self.cvc
    })
  end
  
  def am_billing_address_hash
    {:billing_address => self.to_hash }
  end
  
  def to_hash
    {
      :first_name => self.first_name,
      :last_name  => self.last_name,
      :address1   => self.address.address,
      :city       => self.address.city,
      :state      => self.address.state,
      :zip        => self.address.zip_code,
      :country    => "US",
      :phone      => self.phone
    }
  end
  
  def to_json(a=nil,b=nil)
    self.attributes.dup.merge(self.to_hash).merge({
      :exp_date => self.exp_date,
      :name => "#{first_name} #{last_name}",
      :address => self.address.to_s,
      :number => self.number
    }).to_json
  end
  
  protected
  
  def key
    Digest::SHA1.hexdigest(self.last_4)[0...16]
  end
end
