class AddAddressIdToClaims < ActiveRecord::Migration
  def self.up
    add_column :claims, :address_id, :integer
  end

  def self.down
  end
end
