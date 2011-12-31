class UpdateUnassignedFlagForAllFaxes < ActiveRecord::Migration
  def self.up
    change_column :faxes, :unassigned, :boolean, :default => true
    start = Time.now
    Fax.all.each do |fax|
      fax.update_attributes({ :unassigned => fax.fax_assignable_joins.count == 0 }) 
    end
    puts "Took #{(Time.now - start)/60} minutes"
  end

  def self.down
    start = Time.now
    Fax.all.each do |fax|
      fax.update_attributes({ :unassigned => true })
    end
    puts "Took #{(Time.now - start)/60} minutes"
  end
end
