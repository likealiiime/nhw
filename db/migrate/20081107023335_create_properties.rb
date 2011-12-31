class CreateProperties < ActiveRecord::Migration
  def self.up
    create_table :properties do |t|
      t.integer :customer_id
      t.string  :address
      t.string  :city
      t.string  :state
      t.string  :zip
      
      t.timestamps
    end
  end

  def self.down
    drop_table :properties
  end
end
