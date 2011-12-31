class ChangeMessageIdToNumber < ActiveRecord::Migration
  def self.up
    change_column :faxes, :message_id, :integer
  end

  def self.down
  end
end
