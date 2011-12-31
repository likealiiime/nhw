class CreateRenewals < ActiveRecord::Migration
  def self.up
    create_table :renewals do |t|
      t.date :starts
      t.date :ends
      t.float :amount
      t.integer :customer_id
      
      t.timestamps
    end
  end

  def self.down
    drop_table :renewals
  end
end
