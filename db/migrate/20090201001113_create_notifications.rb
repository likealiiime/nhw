class CreateNotifications < ActiveRecord::Migration
  def self.up
    create_table :notifications do |t|
      t.string    :message
      t.string    :notification_type
      t.string    :level
      t.integer   :subject_id
      t.string    :subject_type
      t.string    :subject_summary
      t.integer   :actor_id
      t.string    :actor_type
      t.string    :actor_summary
      
      t.timestamps
    end
  end

  def self.down
    drop_table :notifications
  end
end
