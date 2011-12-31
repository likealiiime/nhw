class MigrateVerified < ActiveRecord::Migration
  def self.up
    add_column :addresses, :geocoded_address, :string
    
    #Address.find_all_by_verified(true).each do |a|
    #  a.update_attributes({ :verified_address => a.to_s })
    #end
  end

  def self.down
    #Address.find_all_by_verified(true).each do |a|
    #  a.update_attributes({ :verified_address => nil })
    #end
  end
end
