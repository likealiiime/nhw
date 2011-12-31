class CreateCreditCards < ActiveRecord::Migration
  def self.up
    create_table :credit_cards do |t|
      t.string  :crypted_number
      t.string  :last_4
      t.string  :first_name
      t.string  :last_name
      t.string  :phone
      
      t.integer :customer_id
      t.integer :month
      t.integer :year
      t.integer :address_id
      
      t.timestamps
    end
  end

  def self.down
    drop_table :credit_cards
  end
end
