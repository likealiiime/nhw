class MakeAddressesLessStrict < ActiveRecord::Migration
  def self.up
    change_column :addresses, :city, :string, :default => '', :null => true
    change_column :addresses, :state, :string, :default => '', :null => true
    change_column :addresses, :zip_code, :string, :default => '', :null => true
  end

  def self.down
  end
end
