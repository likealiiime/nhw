class AddCoverageDescriptionToPackages < ActiveRecord::Migration
  def self.up
    add_column :packages, :covers, :string, :limit => 600, :default => ''
  end

  def self.down
  end
end
