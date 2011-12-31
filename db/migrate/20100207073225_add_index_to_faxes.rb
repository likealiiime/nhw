class AddIndexToFaxes < ActiveRecord::Migration
  def self.up
    add_index :faxes, :source_id, :name => 'index_faxes_on_source_id'
  end

  def self.down
    remove_index :faxes, :source_id, :name => 'index_faxes_on_source_id'
  end
end
