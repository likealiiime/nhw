class AddServiceChargeToRepairs < ActiveRecord::Migration
  def self.up
    add_column :repairs, :service_charge, :float, :default => 60.0
  end

  def self.down
  end
end
