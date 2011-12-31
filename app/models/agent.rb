class Agent < ActiveRecord::Base
  has_one :account, :as => :parent, :dependent => :destroy
  has_many :transactions, :foreign_key => 'original_agent_id', :order => 'created_at DESC'
  has_many  :approved_transactions,
            :class_name => 'Transaction',
            :foreign_key => 'original_agent_id',
            :order => 'created_at DESC',
            :conditions => ['response_code = 1']
           
  def empty?
    self.name == 'Empty'
  end
  
  def sum_approved_transactions
    self.approved_transactions.collect { |t| t.amount }.sum
  end
  
  def commission
    self.sum_approved_transactions.to_f * (self.commission_percentage.to_f / 100.0)
  end
  
  def Agent.array
    Agent.find(:all, :order => 'name ASC').collect { |a|
      [a.name.capitalize, a.id]
    }
  end
  
  def notification_summary
    "#{self.name.capitalize}"
  end
  
  def edit_url
    "/admin/agents/edit/#{self.id}"
  end
end
