class CreateWorkOrders < ActiveRecord::Migration
  def self.up
    create_table :work_orders do |t|
      t.integer :claim_id
      t.integer :contractor_id

      t.timestamps
    end
  end

  def self.down
    drop_table :repairs
  end
end
