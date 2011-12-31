class Admin::ConversionsController < ApplicationController
  before_filter :check_login
  
  def transactions_to_utc
    Transaction.find(:all).each do |t|
      t.update_attributes({
        :created_at => t.created_at.utc,
        :updated_at => t.updated_at.utc
      })
    end
    render :text => ""
  end
  
  def set_default_roles
  	Account.find(:all).each do |account|
  	  if account.parent_type == 'Agent'
  	    account.role = 'admin'
  	  else
  	    account.role = 'customer'
  	  end
  	  account.save
  	end
  end
  
  def account_for_agent
    messages = []
    (Agent.find :all).each do |agent|
      account = Account.create({
        :email => agent.name,
        :password => agent.password,
        :parent_id => agent.id,
        :parent_type => 'Agent',
        :timezone => -5
      })
      messages << "Created account ##{account.id}"
    end
    render :text => messages.join('<br>')
  end
  
  def notes_timestamp_to_created_at
  	start = Time.now
  	messages = []
  	i = 0
  	Note.find(:all).each do |note|
  	  if i == 1000 then break end
  	  if not note.timestamp
  	  	messages << "Note ##{note.id} does not have a timestamp"
  	  	next
  	  end
  	  
  	  unless note.created_at
  	    note.created_at = Time.at(note.timestamp.to_i).utc
  	    begin
  	      note.save!
  	      messages << "Note ##{note.id} has been saved"
  	    rescue
  	      messages << "There was a problem with Note ##{note.id}: #{$!.message}"
  	    end
  	  end
  	  i += 1
  	end
  	stop = Time.now
  	render :text => "#{(stop - start)/60}<br><br>" << messages.join('<br>')
  end
  
  def claims_timestamp_to_created_at
  	messages = []
  	Claim.find(:all).each do |claim|
  	  if not claim.claim_timestamp
  	    messages << "Claim ##{claim.id} does not have a timestamp"
  	   	next
  	  end
  	  
  	  unless claim.created_at
  	  	claim.created_at = Time.at(claim.claim_timestamp.to_i).utc
  	  	begin
  	  	  claim.save!
  	  	  messages << "Claim ##{claim.id} has been saved"
  	  	rescue
  	  	  messages << "There was a problem with Claim ##{claim.id}: #{$!.message}"
  	  	end
  	  end
  	end	
  	render :text => messages.join('<br>')
  end
  
  def customers
  	start = Time.now
    @messages = []
    i = 0
    (Customer.find :all).each do |customer|
      #if i == 1000 then break end
      line = ""
      if customer.timestamp
        customer.created_at = Time.at(customer.timestamp).utc
        line << "customer.created_at = #{customer.created_at}<br>"
      end
      if customer.coverage_end
      	customer.coverage_ends_at = Time.at(customer.coverage_end.to_i).utc
      	line << "customer.coverage_ends_at = #{customer.coverage_ends_at}<br>"
      end
      if customer.customer_password
      	Account.create({
      	  :email => customer.email,
      	  :password => customer.customer_password,
      	  :parent_id => customer.id,
      	  :parent_type => 'Customer',
      	  :timezone => 0
      	})
      	line << "customer.account.id = #{customer.account.id}<br>"
      end
      
      if customer.cardNumber
        customer.credit_card_number = customer.cardNumber
        line << "customer.credit_card_number_hash.nil? = #{customer.credit_card_number_hash.nil?}<br>"
      end
      
      customer.save!
      @messages << line
      
      i += 1
    end
    @lap = (start - Time.now)/60
  end
end
