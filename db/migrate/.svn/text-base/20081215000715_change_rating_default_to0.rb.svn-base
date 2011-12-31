class ChangeRatingDefaultTo0 < ActiveRecord::Migration
  def self.up
    change_column :contractors, :rating, :integer, :default => 0
  end

  def self.down
    change_column :contractors, :rating, :integer, :default => 3
  end
end
