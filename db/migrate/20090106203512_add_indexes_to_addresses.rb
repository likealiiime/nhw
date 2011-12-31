class AddIndexesToAddresses < ActiveRecord::Migration
  def self.up
    add_index :addresses, [:zip_code], :name => 'addresses_zip_code_idx'
    add_index :addresses, [:addressable_id], :name => 'addresses_addressable_id_idx'
    add_index :addresses, [:addressable_type], :name => 'addresses_addressable_type_idx'
    add_index :addresses, [:address_type], :name => 'addresses_address_type_idx'
  end

  def self.down
  end
end
