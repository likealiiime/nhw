class ChangeContractorNotesToString < ActiveRecord::Migration
  def self.up
    change_column :contractors, :notes, :string, :default => ''
  end

  def self.down
    change_column :contractors, :notes, :text, :null => false
  end
end
