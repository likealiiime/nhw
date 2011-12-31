require 'fileutils'

def interpretation_of(data)
  case data.class
  when TrueClass
    'Yes'
  when FalseClass
    'No'
  when NilClass
    '(No Data)'
  when Time
    data.strftime(TIME_FORMAT)
  when String
    if data == 'true'
      'Yes'
    elsif data == 'false'
      'No'
    else
      data
    end
  else
    data.to_s
  end
end

def process_fields_on_object_to_document(fields, object, document)
  fields.each do |field|
    if Symbol === field
      label, data = (field.to_s.humanize + ":").ljust(35), object.send(field)
    elsif Proc === field
      label, data = '', field.call(object)
    elsif String === field
      label, data = "\n#{field.upcase}\n#{'-' * (field.length + 1)}\n", ""
    end
    document << "#{label}#{interpretation_of data}" << "\n"
  end
end

TIME_FORMAT = "%m/%d/%Y at %I:%M%p ET"
BASE_DIR = "#{RAILS_ROOT}/tmp/explosion"
CUSTOMERS_DIR = "#{BASE_DIR}/Customers"
CONTRACTORS_DIR = "#{BASE_DIR}/Contractors"
CONTENT_DIR = "#{BASE_DIR}/Content"
TEMPLATES_DIR = "#{BASE_DIR}/Email Templates"

namespace :explode do
  task :templates => :environment do
    FileUtils.mkdir_p(TEMPLATES_DIR)
    puts "--- Created Email Templates dir"
    EmailTemplate.all.each do |template|
      path = TEMPLATES_DIR + "/" + "#{template.name} - #{template.subject}.html.txt".gsub(/\/:/, '-')
      File.open(path, 'w') { |file| file << template.body }
      puts "+++ Wrote to #{path}"
    end
  end
  
  task :content => :environment do
    FileUtils.mkdir_p(CONTENT_DIR)
    puts "--- Created Content dir"
    Content.all.each do |content|
      path = CONTENT_DIR + "/#{content.slug}.html.txt"
      File.open(path, 'w') { |file| file << content.html }
      puts "+++ Wrote to #{path}"
    end
  end
  
  task :contractors => :environment do
    start = Time.now
    FileUtils.mkdir_p(CONTRACTORS_DIR)
    puts "--- Created Contractors dir"
    count = 0
    fields = [
      'Contractor Info',
      :first_name, :last_name, :company, :job_title, :phone, :mobile, :fax, :email,
      :priority, :notes, :created_at, :updated_at, :receive_invoice_as, :rating, :flagged, :url,
      :address,
      
      'Faxes',
      Proc.new { |contractor|
        Fax.for_contractor(contractor.id).collect { |fax| "Fax ID:\t#{fax.id}\n" }
      }
    ]
    puts "+++ #{Contractor.count} Contractors"
    Contractor.all.each do |contractor|
      path = CONTRACTORS_DIR + '/' + "#{contractor.name}.txt".gsub(/[\/:]/, '-')
      File.open(path, 'w') { |file| process_fields_on_object_to_document(fields, contractor, file) }
      count += 1
      puts "+++ (#{count}) Wrote to #{path}"
    end
    stop = Time.now
    minutes = (Time.now - start) / 60.0
    puts "+++ Finished in %d hours %.1f minutes" % [minutes / 60.0, minutes % 60.0]
  end
  
  task :customers => :environment do
    start = Time.now
    Customer.code_status_hash.each { |code, status| FileUtils.mkdir_p("#{CUSTOMERS_DIR}/#{status}") }
    puts "--- Created status dirs"
    count = 0
    fields = [
      'Customer Info',
      :name, :contract_number, :created_at, :updated_at, :email, :customer_phone, :status, :from,
      :cancel_reason, :esigned?, :list_price, :home_type, :package_name, :coverage_option_names,
      
      'Addresses',
      Proc.new { |customer|
        ([customer.full_address] + customer.addresses.collect(&:to_s)).join("\n")
      },
      
      'Billing',
      :num_payments, :pay_amount, :credit_card_number_first_1_last_4, :expirationDate, :subscription_id,
      
      'Transactions',
      Proc.new { |customer|
        customer.transactions.collect { |t|
          "#{t.created_at.strftime(TIME_FORMAT)} - #{t.dollar_amount} - #{t.result} - TID #{t.transaction_id}\n"
        }
      },
      
      'Encrypted Credit Cards',
      Proc.new { |customer|
        text = "Encrypted main CC number: #{customer.credit_card_number_hash} - Exp: #{customer.expirationDate}"
        customer.credit_cards.collect { |cc|
          text = "#{cc.first_name} #{cc.last_name} - ************#{cc.last_4} Exp. #{cc.month}/#{cc.year} - #{cc.phone}"
          text << "\n  Encrypted Number: #{cc.crypted_number}"
          text << "\n  Address: #{cc.address.to_s}" if cc.address
        }
        text << "\n\n"
      },
      
      'Notes',
      Proc.new { |customer|
        customer.notes.collect { |n|
          "#{n.note_text} - #{n.date.strftime(TIME_FORMAT)} by #{n.agent_name}\n\n"
        }
      },
      
      'Claims & Repairs',
      Proc.new { |customer|
        customer.claims.collect { |c|
          text = "#{c.status} - #{c.claim_text} - #{c.address} - #{c.date.strftime(TIME_FORMAT)} by #{c.agent_name}"
          text << "\n  Repair: #{c.repair.formatted_status} #{c.repair.formatted_authorization} - #{c.repair.formatted_service_charge} - Contractor: #{c.repair.contractor ? c.repair.contractor.name : '(No Contractor)'}" if c.repair
          text << "\n\n"
        }
      },
      
      'Faxes',
      Proc.new { |customer|
        Fax.for_customer(customer.id).collect { |fax|
          "Fax ID:\t#{fax.id}\n"
        }
      }
    ]
    puts "+++ #{Customer.count} Customers"
    Customer.all.each do |customer|
      status_dir = Customer.code_status_hash[customer.status_id]
      path = "#{CUSTOMERS_DIR}/#{status_dir}/" << "#{customer.contract_number} - #{customer.name}.txt".gsub(/[\/:]/, '-').gsub('#', '')
      File.open(path, 'w') { |file| process_fields_on_object_to_document(fields, customer, file) }
      count += 1
      puts "+++ (#{count}) Wrote to #{path}"
    end
    stop = Time.now
    minutes = (Time.now - start) / 60.0
    puts "+++ Finished in %d hours %.1f minutes" % [minutes / 60.0, minutes % 60.0]
  end
end