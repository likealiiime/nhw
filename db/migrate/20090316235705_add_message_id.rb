class AddMessageId < ActiveRecord::Migration
  def self.up
    add_column :faxes, :message_id, :string
  end

  def self.down
  end
end
