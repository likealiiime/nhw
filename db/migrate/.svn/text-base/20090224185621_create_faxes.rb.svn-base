class CreateFaxes < ActiveRecord::Migration
  def self.up
    create_table :faxes do |t|
      t.integer   :assignable_id
      t.integer   :assignable_type
      t.string    :path
      t.datetime  :received_at
      t.string    :sender_fax_number
      t.timestamps
    end
  end

  def self.down
    drop_table :faxes
  end
end
