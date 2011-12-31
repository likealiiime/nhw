class AnotherPurge < ActiveRecord::Migration
  def self.up
    ActiveRecord::Base.transaction do
      customers = Customer.find(:all, :include => :transactions, :conditions => "customers.status_id != 4 AND transactions.created_at < '2009-6-20 00:00:00'")
      count = customers.count
      filename = "#{RAILS_ROOT}/doc/cancelled_ids_2"
      puts "--- Writing ids to #{filename}..."
      open(filename, 'w') do |file|
        customers.each do |customer|
          file.puts customer.id
        end
      end
      puts "--- Wrote #{count} ids"
      
      puts "--- Iterating over Customers..."
      customers.each do |customer|
        customer.update_attributes({:status_id => 5})
      end
      puts "--- Updated #{count} customers"
    end
  end

  def self.down
    ActiveRecord::Base.transaction do
      puts "--- Undoing..."
      filename = "#{RAILS_ROOT}/doc/cancelled_ids_2"
      count = 0
      open(filename, 'r') do |file|
        until file.eof?
          id = file.readline.chomp.to_i
          Customer.find(id).update_attributes({:status_id => 4})  
          count += 1
        end
      end
      puts "--- Undid #{count} Customers"
    end
  end
end
