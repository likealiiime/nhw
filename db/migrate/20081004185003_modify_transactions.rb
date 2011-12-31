class ModifyTransactions < ActiveRecord::Migration
  def self.up
    rename_column :transactions, :cust_id, :customer_id
    
    remove_column :transactions, :invoice_num
    remove_column :transactions, :method
    remove_column :transactions, :is_test_request

    add_column :transactions, :original_agent_id, :integer
  end

  def self.down
    rename_column :transactions, :customer_id, :cust_id
    
    add_column :transactions, :invoice_num, :string
    add_column :transactions, :method, :string
    add_column :transactions, :is_test_request, :boolean
    
    remove_column :transactions, :original_agent_id
  end
end
