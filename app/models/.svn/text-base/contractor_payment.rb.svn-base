class ContractorPayment < ActiveRecord::Base
  belongs_to  :contractor
  belongs_to  :repair
  
  def dollar_amount
    "$%.2f" % (self.amount || 0.0)
  end
  
  def paid_on
    self.paid_at ? self.paid_at.strftime(strftime_date) : 'Unpaid'
  end
  
  def paid?
    not self.paid_at.nil?
  end
  
  def edit_url
    '/admin/transactions'
  end
  
  def notification_summary
    "Payment of #{self.dollar_amount} to #{self.contractor.notification_summary}"
  end
end
