class AddYearsToRenewals < ActiveRecord::Migration
  def self.up
    add_column :renewals, :years, :integer
  end

  def self.down
    remove_column :renewals, :years
  end
end
