class AddPublishedAt < ActiveRecord::Migration
  def self.up
    add_column :articles, :published_at, :datetime
  end

  def self.down
  end
end
