class AddRepairStatus < ActiveRecord::Migration
  def self.up
    add_column :repairs, :status, :integer, :default => 0
  end

  def self.down
  end
end
