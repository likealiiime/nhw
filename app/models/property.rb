class Property < ActiveRecord::Base
  belongs_to :customer
  #has_one :address, :as => :addressable, :dependent => :destroy
  #validates_associated :address
  named_scope :of_customer, lambda { |id| {:conditions => ['customer_id = ?', id]} }
  
  def make_address!
    logger.info("Making Address for Property #{self.id}")
    Address.create({
      :address => self.address || '',
      :city => self.city || '',
      :state => self.state || '',
      :zip_code => self.zip || '',
      :address_type => 'Property',
      :addressable_type => "Customer",
      :addressable_id => self.customer_id
    })
  end
end
