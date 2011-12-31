class AddFromFieldOnCustomers < ActiveRecord::Migration
  def self.up
    add_column :customers, :from, :string
  end

  def self.down
  end
end
