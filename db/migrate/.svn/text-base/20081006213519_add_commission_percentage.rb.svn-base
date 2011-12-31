class AddCommissionPercentage < ActiveRecord::Migration
  def self.up
    add_column :agents, :commission_percentage, :integer, :null => false, :default => 8
  end

  def self.down
    remove_column :agents, :commission_percentage
  end
end
