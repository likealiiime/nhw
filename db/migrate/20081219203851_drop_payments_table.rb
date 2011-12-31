class DropPaymentsTable < ActiveRecord::Migration
  def self.up
    drop_table :payments
  end

  def self.down
  end
end
