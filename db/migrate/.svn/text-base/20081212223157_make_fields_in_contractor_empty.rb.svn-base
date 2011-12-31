class MakeFieldsInContractorEmpty < ActiveRecord::Migration
  def self.up
    change_column :contractors, :first_name, :string, :default => '', :null => false
    change_column :contractors, :last_name, :string, :default => '', :null => false
    change_column :contractors, :job_title, :string, :default => '', :null => false
    change_column :contractors, :phone, :string, :default => '', :null => false
    change_column :contractors, :mobile, :string, :default => '', :null => false
    change_column :contractors, :fax, :string, :default => '', :null => false
    change_column :contractors, :email, :string, :default => '', :null => false
    change_column :contractors, :priority, :string, :default => '', :null => false
    change_column :contractors, :notes, :text, :default => '', :null => false
  end

  def self.down
    change_column :contractors, :first_name, :string, :null => true
    change_column :contractors, :last_name, :string, :null => true
    change_column :contractors, :job_title, :string, :null => true
    change_column :contractors, :phone, :string, :null => true
    change_column :contractors, :mobile, :string, :null => true
    change_column :contractors, :fax, :string, :null => true
    change_column :contractors, :email, :string, :null => true
    change_column :contractors, :priority, :string, :null => true
    change_column :contractors, :notes, :text, :null => true
  end
end
