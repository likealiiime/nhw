class AddLatLngToAddresses < ActiveRecord::Migration
  def self.up
    add_column :addresses, :lat, :float
    add_column :addresses, :lng, :float
  end

  def self.down
  end
end
