class CreateFaxSources < ActiveRecord::Migration
  def self.up
    create_table :fax_sources do |t|
      t.string :name
      t.string :address
      t.string :number
      t.string :key
      t.timestamps
    end
    
    FaxSource.create({
      :name => 'New Contractors',
      :address => 'fax.contractors.new@nationwidehomewarranty.com',
      :number => '2144530024',
      :key => 'fax.contractors.new'
    })
  end

  def self.down
    drop_table :fax_sources
  end
end
