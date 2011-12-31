class RenameWorkOrdersToRepairs < ActiveRecord::Migration
  def self.up
    rename_table :work_orders, :repairs
  end

  def self.down
    rename_table :repairs, :work_orders
  end
end
