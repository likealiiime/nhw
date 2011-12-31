class CreateFaxAssignableJoins < ActiveRecord::Migration
  def self.up
    create_table :fax_assignable_joins do |t|
      t.integer :fax_id
      t.integer :assignable_id
      t.string  :assignable_type
      
      t.timestamps
    end
  end

  def self.down
    drop_table :fax_assignable_joins
  end
end
