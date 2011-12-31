class AddDiscountIdToCustomers < ActiveRecord::Migration
  def self.up
    add_column :customers, :discount_id, :integer, :null => true
  end

  def self.down
    remove_column :customers, :discount_id
  end
end
