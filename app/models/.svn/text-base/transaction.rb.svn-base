class Transaction < ActiveRecord::Base
  belongs_to :customer
  #belongs_to :agent, :foreign_key => 'original_agent_id'
  has_one :agent, :through => :customer
  
  named_scope :of_customer, lambda { |id| { :conditions => ['customer_id = ?', id ] } }
  named_scope :for_agent, lambda { |agent|
    { :joins => Transaction.agents_join_sql(agent.id) }
  }
  named_scope :for_agent_between, lambda { |agent, from, to|
    join = Transaction.agents_join_sql(agent.id)
    join << " AND transactions.created_at BETWEEN '#{from.strftime('%Y-%m-%d')}' AND '#{to.strftime('%Y-%m-%d')}'"
    { :joins => join }
  }
  
  def Transaction.agents_join_sql(id)
    "LEFT JOIN `customers` ON transactions.customer_id = customers.id " <<
    "LEFT JOIN `agents` ON customers.agent_id = agents.id " <<
    "WHERE agents.id = #{id}"
  end
  
  def edit_url
    '/admin/transactions'
  end
  
  def notification_summary
    self.dollar_amount
  end
  
  def result
    case self.response_code
    when 1
      "Approved"
    when 2, 4
      "Declined"
    when 6
      "Invalid Card"
    when 8
      "Expired Card"
    when 27
      "AVS Mismatch"
    when 11
      "Duplicate"
    when -1
      "Credit"
    when -2
      "Void"
    when -3
      "Voided"
    else
      ""
    end
  end
  
  def dollar_amount
    "$%.2f" % (self.amount || 0.0)
  end

  def result_class
    "transaction_#{self.result.downcase.gsub(/\s/, '')}"
  end
  
  def approved?
    self.response_code == 1
  end
  
  protected
  
  def after_save
    if [2,4,6,8,27].include?(self.response_code) and self.customer
      Postoffice.deliver_template('Billing', [self.customer.email], { :customer => self.customer })
    end
  end
end
