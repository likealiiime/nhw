class AddUnassignedColumnToFaxes < ActiveRecord::Migration
  def self.up
    add_column :faxes, :unassigned, :boolean, :default => false
    add_index  :faxes, :unassigned, :name => 'index_faxes_on_unassigned'
  end

  def self.down
    remove_column :faxes, :unassigned
    remove_index  :faxes, :unassigned, :name => 'index_faxes_on_unassigned'
  end
end
