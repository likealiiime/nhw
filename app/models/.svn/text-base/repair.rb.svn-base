class Repair < ActiveRecord::Base
  # relationships
  belongs_to  :claim
  belongs_to  :contractor
  has_one     :payment, :class_name => 'ContractorPayment'
  
  def edit_url
    self.claim.edit_url
  end
  
  def notification_summary
    "Repair for #{self.claim.customer.notification_summary}"
  end
  
  def formatted_service_charge
    "$%.0f" % (self.service_charge || 0)
  end
  
  def to_json(one=nil, two=nil)
    {
      :id => self.id,
      :authorization => self.authorization,
      :formattedAuthorization => self.formatted_authorization,
      :amount => self.amount,
      :formattedAmount => "$%.2f" % self.amount,
      :contractor_id => self.contractor_id,
      :contractor => self.contractor,
      :status => self.status,
      :formattedStatus => self.formatted_status,
      :service_charge => self.service_charge,
      :formattedServiceCharge => self.formatted_service_charge
    }.to_json
  end
  
  def formatted_authorization
    case self.authorization
    when 0
      "Unauthorized"
    when 1
      "Authorized"
    end
  end
  
  def formatted_status
    case self.status
    when 0
      "Incomplete"
    when 1
      "Complete"
    end
  end
  
  def authorized?
    self.authorization == 1
  end
  
  def complete?
    self.status == 1
  end
  
  def customer
    self.claim.customer
  end
  
  def toggle_status!
    self.update_attributes({:status => self.status == 0 ? 1 : 0 })
  end
  
  def toggle_authorization!
    self.update_attributes({:authorization => self.authorization == 0 ? 1 : 0 })
  end
  
  protected
  
  def after_save
    if self.authorized?
      if self.payment
        # Notify Payment will change
        updated = self.payment.update_attributes({ :amount => self.amount, :contractor_id => self.contractor_id })
        #notify(Notification::UPDATED, self.payment) if updated
        Notification.notify(Notification::UPDATED, self.payment) if updated
      else
        self.create_payment({ :amount => self.amount, :contractor_id => self.contractor_id })
        Notification.notify(Notification::CREATED, { :message => 'created and authorized', :subject => self.payment }) if self.payment
      end
    else  # Repair is no longer authorized
      # Remove Payment
      if self.payment and not self.payment.paid?
        Notification.notify(Notification::DELETED, { :message => 'retracted', :subject => self.payment}) if self.payment.destroy
      end
    end
    
    return true
  end
end
