class StupidlyRenameLastLogin < ActiveRecord::Migration
  def self.up
    rename_column :accounts, :last_login, :last_login_ip
    add_column :accounts, :last_login_at, :datetime, :null => true
  end

  def self.down
  end
end
