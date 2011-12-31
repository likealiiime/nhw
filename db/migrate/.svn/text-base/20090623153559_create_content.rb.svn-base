class CreateContent < ActiveRecord::Migration
  def self.up
    create_table :content do |t|
      t.string :slug
      t.text   :html
      
      t.timestamps
    end
  end

  def self.down
    drop_table :content
  end
end
