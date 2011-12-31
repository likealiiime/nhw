class ThirdPugr < ActiveRecord::Migration
  def self.up
    ActiveRecord::Base.transaction do
      kept_ids = Customer.find(:all, :select => 'id', :include => :transactions, :conditions => "transactions.response_code = 1 AND customers.status_id = 4 AND transactions.created_at >= '2009-6-20 00:00:00'").collect(&:id)

      cancelled = Customer.find(:all, :select => 'id', :conditions => ["customers.status_id = 4 AND id NOT IN (?)", kept_ids])
      filename = "#{RAILS_ROOT}/doc/cancelled_ids_3"
      puts "--- Writing cancelled ids to #{filename}..."
      open(filename, 'w') do |file|
        cancelled.each { |c| file.puts c.id }
      end
      puts "--- Wrote #{cancelled.count} ids"
      
      puts "--- Cancelling customers..."
      count = 0
      cancelled.each do |customer|
        customer.update_attributes({:status_id => 5})
        count += 1
      end
      puts "--- Updated #{count} customers"
    end
  end

  def self.down
    ActiveRecord::Base.transaction do
      puts "--- Undoing..."
      filename = "#{RAILS_ROOT}/doc/cancelled_ids_3"
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
