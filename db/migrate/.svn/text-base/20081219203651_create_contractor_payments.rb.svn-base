class CreateContractorPayments < ActiveRecord::Migration
  def self.up
    create_table :contractor_payments do |t|
      t.integer   :contractor_id
      t.float     :amount
      t.integer   :repair_id
      t.datetime  :paid_at
      t.timestamps
    end
  end

  def self.down
    drop_table :contractor_payments
  end
end
