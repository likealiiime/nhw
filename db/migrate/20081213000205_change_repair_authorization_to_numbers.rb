class ChangeRepairAuthorizationToNumbers < ActiveRecord::Migration
  def self.up
    change_column :repairs, :authorization, :integer, :default => 0, :null => false
  end

  def self.down
    change_column :repairs, :authorization, :string, :default => "unauthorized", :null => false
  end
end
