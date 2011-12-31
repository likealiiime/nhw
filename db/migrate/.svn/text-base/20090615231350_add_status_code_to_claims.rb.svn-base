class AddStatusCodeToClaims < ActiveRecord::Migration
  def self.up
    remove_column :claims, :claim_approve
    add_column    :claims, :status_code, :integer, :default => 0
  end

  def self.down
  end
end
