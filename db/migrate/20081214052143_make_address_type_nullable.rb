class MakeAddressTypeNullable < ActiveRecord::Migration
  def self.up
    change_column :addresses, :address_type, :string, :default => 'Property', :null => true
  end

  def self.down
  end
end
