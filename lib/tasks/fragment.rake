require 'fileutils'

def value_of(data)
  case data.class
  when TrueClass, FalseClass
    data ? 'Yes' : 'No'
  when NilClass
    ''
  else
    data
  end
end

TRANSACTION_CUTOFF_DATETIME = Time.parse('11/30/09').at_beginning_of_day

task :fragment => :environment do
  customers = Customer.find(:all, :conditions => "status_id IN (4,7,5)")
  puts "--- #{customers.count} customers"
  path = "#{RAILS_ROOT}/tmp/fragments"
  FileUtils.mkdir_p(path)
  datasets = {
    :customer => [
      :name, :contract_number, :created_at, :updated_at, :email, :customer_phone,
      :status, :from, :cancel_reason,
      :esigned?, :list_price, :home_type, :package_name,
      :coverage_option_names
    ],
    :properties_addresses => [
      Proc.new { |customer|
        text = [customer.full_address] + customer.addresses.collect(&:to_s)
        ['Addresses', text.join("\n")]
      }
    ],
    :billing => [
      :num_payments, :pay_amount, :credit_card_number_last_4, :expirationDate, :subscription_id,
      Proc.new { |customer|
        text = customer.transactions.find(:all, :conditions => ['created_at < ?', TRANSACTION_CUTOFF_DATETIME]).collect { |t|
          "#{t.created_at} - #{t.result} - #{t.dollar_amount}"
        }.join("\n")
        ['Transactions', text]
      }
    ]
  }
  customers.each do |customer|
    datasets.each do |dataset, fields|
      File.open(File.join(path, "#{customer.contract_number}-#{dataset}.txt"), 'w') { |file|
        fields.each do |field|
          if Symbol === field
            label, data = field.to_s.humanize, customer.send(field)
          elsif Proc === field
            label, data = field.call(customer)
          end
          file.puts "#{label}:\t#{value_of data}"
        end
      }
    end
  end
end
