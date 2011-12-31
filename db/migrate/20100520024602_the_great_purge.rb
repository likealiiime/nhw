class TheGreatPurge < ActiveRecord::Migration
  def self.up
    ActiveRecord::Base.transaction do
      eleven_months_ago = "#{11.months.ago.strftime('%Y-%m-%d')} 00:00:00"
      select = lambda { |fields| <<-SQL
          SELECT #{fields}
          FROM customers RIGHT JOIN
            (SELECT id, customer_id, created_at, amount FROM transactions
              WHERE transactions.response_code = 1
            ORDER BY transactions.created_at DESC) AS tr
          ON tr.customer_id = customers.id
            WHERE customers.status_id = 4 AND tr.created_at <= '#{eleven_months_ago}'
        SQL
      }
      filename = "#{RAILS_ROOT}/doc/cancelled_ids"
      puts "--- Writing ids to #{filename}..."
      count = 0
      open(filename, 'w') do |file|
        Customer.connection.execute(select['customers.id']).each do |row|
          file.puts row.first
          count += 1
        end
      end
      puts "--- Wrote #{count} ids"
      
      puts "--- Iterating over Customers..."
      count = 0
      Customer.find_by_sql(select['*']).each do |customer|
        customer.update_attributes({:status_id => 5})
        count += 1
      end
      puts "--- Updated #{count} customers"
    end
  end

  def self.down
    ActiveRecord::Base.transaction do
      puts "--- Undoing..."
      filename = "#{RAILS_ROOT}/doc/cancelled_ids"
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
