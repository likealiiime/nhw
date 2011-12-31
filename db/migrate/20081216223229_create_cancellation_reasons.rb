class CreateCancellationReasons < ActiveRecord::Migration
  def self.up
    create_table :cancellation_reasons do |t|
      t.string :reason, :default => ''
      t.timestamps
    end
    add_column :customers, :cancellation_reason_id, :integer
  end

  def self.down
    #drop_table :cancellation_reasons
  end
end
