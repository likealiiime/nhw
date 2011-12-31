class AddWaitPeriodOverrides < ActiveRecord::Migration
  def self.up
    add_column :customers, :wait_period_text_override, :string
    add_column :customers, :wait_period_amt_override, :integer
    add_column :customers, :num_payments_amt_override, :integer
  end

  def self.down
  end
end
