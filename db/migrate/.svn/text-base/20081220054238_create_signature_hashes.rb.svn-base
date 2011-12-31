class CreateSignatureHashes < ActiveRecord::Migration
  def self.up
    create_table :signature_hashes do |t|
      t.text :hash, :null => false
      t.integer :account_id, :null => false
      t.timestamps
    end
  end

  def self.down
    drop_table :signature_hashes
  end
end
