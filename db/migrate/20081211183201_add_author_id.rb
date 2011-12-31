class AddAuthorId < ActiveRecord::Migration
  def self.up
    add_column :notes, :author_id, :integer, :null => true
  end

  def self.down
    remove_column :notes, :author_id
  end
end
