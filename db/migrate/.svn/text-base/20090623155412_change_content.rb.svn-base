class ChangeContent < ActiveRecord::Migration
  def self.up
    add_index :content, [:slug], :name => 'content_slug_index'
    change_column :content, :slug, :string, :unique => true, :null => false
    change_column :content, :html, :text, :default => '', :null => false
  end

  def self.down
  end
end
