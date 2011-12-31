class ChangeWaitPeriodOverrides < ActiveRecord::Migration
  def self.up
    rename_column :customers, :wait_period_amt_override, :wait_period_days_override
    rename_column :customers, :num_payments_amt_override, :num_payments_override
  end

  def self.down
  end
end
