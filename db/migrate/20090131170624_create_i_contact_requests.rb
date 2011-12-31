class CreateIContactRequests < ActiveRecord::Migration
  def self.up
    create_table :i_contact_requests do |t|
      t.string :path, :null => false
      t.string :put, :limit => 512
      t.timestamps
    end
    add_column :customers, :icontact_id, :integer
  end

  def self.down
    drop_table :i_contact_requests
  end
end
