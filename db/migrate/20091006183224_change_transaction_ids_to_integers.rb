class ChangeTransactionIdsToIntegers < ActiveRecord::Migration
  def self.up
    change_column :transactions, :transaction_id, :integer, :default => nil
    change_column :transactions, :customer_id, :integer, :default => nil
  end

  def self.down
  end
end
