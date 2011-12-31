class MakeAmountDefaultZero < ActiveRecord::Migration
  def self.up
    change_column :repairs, :amount, :float, :default => 0.0, :null => false
  end

  def self.down
    change_column :repairs, :amount, :float, :null => true
  end
end
