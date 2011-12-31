class AddAuthorizationToRepairs < ActiveRecord::Migration
  def self.up
    add_column :repairs, :authorization, :string, :default => 'unauthorized', :null => false
  end

  def self.down
    remove_column :repairs, :authorization
  end
end
