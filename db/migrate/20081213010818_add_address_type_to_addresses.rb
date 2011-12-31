class AddAddressTypeToAddresses < ActiveRecord::Migration
  def self.up
    add_column :addresses, :address_type, :string, :null => false
  end

  def self.down
  end
end
