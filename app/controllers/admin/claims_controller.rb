class Admin::ClaimsController < ApplicationController
  before_filter :check_login
  
  customer_can :create
  
  ssl_required_for_all
  
  def async_update_claim_or_repair
    claim = Claim.find(params[:id])
    
    if params[:repair]
      params[:repair][:service_charge].gsub!(/[^\d\.]/, '') if params[:repair][:service_charge]
      # Pre-authorize under or equal to $100
      params[:repair][:amount].gsub!(/[^\d\.]/, '') if params[:repair][:amount]
      if params[:repair][:amount].to_f <= 100.0 then params[:repair][:authorization] = 1 end
      # Never authorize $0 or allow null amounts
      if params[:repair][:amount].to_f <= 0.0
        params[:repair][:amount] = 0.0
        params[:repair][:authorization] = 0
      end
    
    
      should_email = false
      if claim.repair
        should_email = params[:repair][:contractor_id] && (params[:repair][:contractor_id].to_i != claim.repair.contractor_id) && !claim.customer.email.blank?
        updated = claim.repair.update_attributes(params[:repair])
        notify(Notification::UPDATED, claim.repair) if updated      
      else # create
        repair = claim.create_repair(params[:repair])
        notify(Notification::CREATED, { :message => 'assigned', :subject => repair })
        should_email = params[:repair][:contractor_id] && claim.repair.contractor && !claim.customer.email.blank?
      end
      if should_email
        Postoffice.deliver_template('Contractor Assigned', claim.customer.email, {
          :customer => claim.customer, :contractor => claim.repair.contractor, :service_charge => claim.repair.formatted_service_charge
        })
        notify(Notification::INFO, { :message => "emailed contractor assignment notice", :subject => claim.customer })
      end
    elsif params[:status_code]
      old_status = claim.status
      claim.update_attributes({ :status_code => params[:status_code] })
      notify(Notification::UPDATED, { :message => "changed from #{old_status} to #{claim.status}", :subject => claim })
    end
    
    render :json => claim
  end
  
  def async_claims
    session[:last_claims_page]  = params[:CIPaginatorPage] || 1
    session[:last_active_statuses]     = params[:CIFilterActiveFilters].split(',').collect(&:to_i)
    # Remove non-numbers and non-commas to prevent injection attacks
    allowed_statuses = params[:CIFilterActiveFilters].gsub(/[^\d,]/, '')
    conditions = "status_code IN (#{allowed_statuses})"
    count = Claim.count(:conditions => conditions)
    claims = Claim.paginate :all,
              :page => params[:CIPaginatorPage],
              :per_page  => (params[:CIPaginatorItemsPerPage] || 15).to_i,
              :conditions => conditions, :order => "updated_at DESC"
              
    render :json => {
      :CIPaginatorPage => params[:CIPaginatorPage],
      :CIPaginatorItemCount => count,
      :CIPaginatorCollection => claims
    }
  end
  
  def create
    if params[:coverages] or params[:force_coverages]
      params[:coverages] ||= {}
      params[:claim][:standard_coverage] = (params[:coverages].collect { |k,v| k }).join(', ')
    end
    claim = Claim.new(params[:claim])
    claim.claim_text = "Claimed Items:\n#{claim.summary}\n\nClaim:\n#{claim.text}"
    claim.status_code = 2 # Placed by Customer
    claim.save
    
    notify(Notification::CREATED, { :message => 'created', :subject => claim})
    
    if current_account.customer?
      redirect_to '/admin/customers/claims'
      Postoffice.deliver_template('New Claim by Customer',
        ['admin@nationwidehomewarranty.com', 'claims@nationwidehomewarranty.com'], {
        :customer => current_account.parent,
        :summary => claim.summary,
        :text => claim.text
      })
    else
      redirect_to "/admin/customers/edit/#{params[:claim][:customer_id]}#claims"
    end
  end
  
  def async_get_for_customer
    customer = Customer.find(params[:id])
    properties = {}
    customer.properties.each { |p| properties[p.to_s] = p.id }
    render :json => {
        :properties_options => properties,
        :claims => customer.claims
    }
  end
  
  def async_create
    params[:claim][:agent_name] = @current_account.parent.name
    params[:claim][:status_code] = 1 # Placed by Agent
    claim = Claim.create(params[:claim])
    notify(Notification::CREATED, { :message => 'created', :subject => claim })
    render :json => {
      :date => claim.date.in_time_zone(EST).strftime("%m/%d/%y %I:%M %p"),
      :text => claim.text
    }
  end
  
end
