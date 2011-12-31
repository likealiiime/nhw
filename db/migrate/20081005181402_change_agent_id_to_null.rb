class ChangeAgentIdToNull < ActiveRecord::Migration
  def self.up
    change_column :customers, :agent_id, :integer, :null => true, :default => nil
    execute "UPDATE customers SET `agent_id` = NULL WHERE `agent_id` = 0;"
  end

  def self.down
    change_column :customers, :agent_id, :integer, :null => false, :default => 0
    execute "UPDATE customers SET `agent_id` = 0 WHERE `agent_id` = NULL;"
  end
end
