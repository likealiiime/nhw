class ChangeBackToVerified < ActiveRecord::Migration
  def self.up
    rename_column :addresses, :avs_validated, :verified
  end

  def self.down
    rename_column :addresses, :verified, :avs_validated
  end
end
