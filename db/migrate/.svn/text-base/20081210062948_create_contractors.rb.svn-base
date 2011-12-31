class CreateContractors < ActiveRecord::Migration
  def self.up
    create_table :contractors do |t|
      t.string :first_name
      t.string :last_name
      t.string :company, :null => false
      t.string :job_title
      t.string :phone
      t.string :mobile
      t.string :fax
      t.string :email
      t.string :priority
      t.text :notes

      t.timestamps
    end
  end

  def self.down
    drop_table :contractors
  end
end
