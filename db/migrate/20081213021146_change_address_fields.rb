class ChangeAddressFields < ActiveRecord::Migration
  def self.up
    rename_column :addresses, :street1, :address
    rename_column :addresses, :street2, :address2
    rename_column :addresses, :street3, :address3
  end

  def self.down
    rename_column :addresses, :address, :street1
    rename_column :addresses, :address2, :street2
    rename_column :addresses, :address3, :street3
  end
end
