class CreateTransactions < ActiveRecord::Migration
  def self.up
    #drop_table :transactions
    create_table :transactions do |t|
      t.integer :response_code
      t.string  :response_reason_text
      t.string  :auth_code
      t.string  :invoice_num
      t.float   :amount
      t.string  :method
      t.string  :transaction_id
      t.string  :cust_id
      t.boolean :is_test_request
      t.integer :subscription_id
      t.integer :subscription_paynum
      
      t.timestamps
    end
  end

  def self.down
    drop_table :transactions
  end
end
