class Account < ActiveRecord::Base
  belongs_to :parent, :polymorphic => true
  has_one    :signature_hash
  
  named_scope :for_contractor_id, lambda { |id|
    { :conditions => { :parent_type => 'Contractor', :parent_id => id }, :limit => 1 }
  }
  
  def Account.timezones
  	# Standard Times. The timezone function corrects for DST
  	[[-5, 'Eastern', 'ET'], [-6, 'Central', 'CT'], [-7, 'Mountain', 'MT'], [-8, 'Pacific', 'PT'], [-9, 'Alaska', 'AT'], [-11, 'Hawaii', 'HT']]
  end
  
  def password=(password)
    if password and not password.empty?
      self.password_hash = Digest::SHA1.hexdigest(password)
    end
  end
  
  def can_crud_credit_cards
    self.role == 'admin' or self.role == 'sales'
  end
  
  def can_see_nhw_tabs
    !(self.customer? or self.contractor? or self.empty?)
  end
  
  def can_crud_contractors
    self.role == 'admin'
  end
  
  def can_change_settings
    self.role == 'admin'
  end
  
  def can_crud_agents
    self.role == 'admin'
  end
  
  def can_crud_content
    self.role == 'admin'
  end
  
  def can_crud_packages
  	self.role == 'admin'
  end
  
  def can_crud_discounts
    self.role == 'admin'
  end
  
  def can_crud_transactions
    self.role == 'admin'
  end
  
  def can_see_completed_orders
    self.role == 'admin'
  end
  
  def can_assign_only_myself
    self.role != 'admin'
  end
  
  def cannot_see_credit_card_number
    self.role == 'claims'
  end
  
  def Account.empty_account
    Account.new({
      :email => 'empty',
      :password => 'empty',
      :role => 'empty',
      :parent_id => 27,
      :parent_type => 'Agent',
      :timezone => -5
    })
  end
  
  def claims?
    self.role == 'claims'
  end
  
  def sales?
    self.role == 'sales'
  end
  
  def empty?
    self.email == 'empty'
  end
  
  def admin?
    self.role == 'admin'
  end
  
  def customer?
    self.parent_type == 'Customer'
  end
  
  def contractor?
    self.parent_type == 'Contractor'
  end
  
  def Account.roles
    %w(admin claims sales)
  end
  
  def Account.generate_random_password(length=8)
    Digest::SHA1.hexdigest("#{rand(1<<64)}")[0...length]
  end
  
  def reset_password
    password = Account.generate_random_password
    if self.update_attributes({ :password => password })
      return "The password for #{self.parent_type} ##{self.parent_id} has been reset to \"#{password}\""
    else
      return "The password for #{self.parent_type} ##{self.parent_id} could not be reset"
    end
  end
  
  def Account.grant_web_account(object)
    return "#{object.name} already has a web account" if object.account
    return "#{object.name} must have a valid email address." if object.email.nil? or object.email.empty?

    password = Account.generate_random_password #length is 8
    object.create_account({
      :email => object.email,
      :password => password,
      :role => object.class.to_s.downcase,
      :timezone => '-5'
    })
    if object.account.nil?
      return "A web account could not be created for #{object.name}"
    else
      return password
    end
  end
  
  def last_login
    "#{self.last_login_at.strftime('%m/%d/%y, at %I:%M %p')}, from #{self.last_login_ip}" if self.last_login_at and self.last_login_ip
  end
end
