class RenameStartsAndEndsOnRenewals < ActiveRecord::Migration
  def self.up
    rename_column :renewals, :starts, :starts_at
    rename_column :renewals, :ends, :ends_at
  end

  def self.down
  end
end
