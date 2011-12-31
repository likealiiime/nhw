class CreateAddresses < ActiveRecord::Migration
  def self.up
    create_table :addresses do |t|
      t.string :street1,          :null => false
      t.string :street2
      t.string :street3
      t.string :city,             :null => false
      t.string :state,            :null => false
      t.string :zip_code,         :null => false
      t.string :country,          :default => "United States of America"
      t.integer :addressable_id
      t.string :addressable_type

      t.timestamps
    end
  end

  def self.down
    drop_table :addresses
  end
end
