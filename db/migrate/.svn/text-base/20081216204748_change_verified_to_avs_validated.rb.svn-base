class ChangeVerifiedToAvsValidated < ActiveRecord::Migration
  def self.up
    rename_column :addresses, :verified, :avs_validated
  end

  def self.down
    rename_column :addresses, :avs_validated, :verified
  end
end
