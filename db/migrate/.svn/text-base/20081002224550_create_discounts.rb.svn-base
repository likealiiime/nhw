class CreateDiscounts < ActiveRecord::Migration
  def self.up
    create_table :discounts do |t|
      t.boolean   :is_monthly
      t.datetime  :starts_at
      t.datetime  :ends_at
      t.float     :value
      t.string    :name
      
      t.timestamps
    end
  end

  def self.down
    drop_table :discounts
  end
end
