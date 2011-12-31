class AddRepairId < ActiveRecord::Migration
  def self.up
    add_column :notes, :repair_id, :integer
  end

  def self.down
    remove_column :notes, :repair_id
  end
end
