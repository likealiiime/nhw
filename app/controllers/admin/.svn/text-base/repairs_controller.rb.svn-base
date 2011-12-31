class Admin::RepairsController < ApplicationController
  before_filter :check_login
  ssl_required_for_all
  
  contractor_can :index, :complete
  layout 'admin', :except => :async_create_or_update_for_claim
  
  def index
    @selected_tab = 'repairs'
    @repairs = current_account.parent.repairs
  end
  
  def work_order
    repair = Repair.find(params[:id])
    
    date = Time.now.in_time_zone(EST).strftime('%m/%d/%y') 
    customer = repair.claim.customer.name
    contract = repair.claim.customer.contract_number
    phone = repair.claim.customer.customer_phone
    address = repair.claim.property.to_s
    company = repair.contractor.company
    claim_text = (repair.claim.claim_text || '').gsub(/\n/, '\\')
    service_charge = repair.formatted_service_charge
    
    rtf = File.read("#{RAILS_ROOT}/app/views/admin/content/work_order_template.rtf")
    rtf.gsub!(/#(\w+?)#/) { |cmd| eval($1) }
    send_data(rtf, { :filename => "Work_Order_for_customer_#{contract}.rtf", :type => 'text/rtf' })
  end
  
  def async_toggle_status
    render :json => Repair.find(params[:id]).toggle_status!
  end
  
  def async_toggle_authorization
    render :json => Repair.find(params[:id]).toggle_authorization!
  end
  
  def async_unassign_contractor_for_claim
    claim = Claim.find(params[:id])
    if claim.repair
      contractor = claim.repair.contractor
      updated = claim.repair.update_attributes({:contractor_id => nil})
      notify(Notification::UPDATED, { :message => "unassigned from Claim on #{claim.customer.contract_number}", :subject => contractor }) if updated
    end
    render :json => claim
  end
  
  def complete
    @selected_tab = 'repairs'
    @repair = Repair.find(params[:id])
    if request.post?
      params[:note][:note_text] = "#{@repair.contractor.company}:\n#{params[:note][:note_text]}"
      @repair.claim.customer.notes.create(params[:note])
      @repair.update_attributes({ :status => 1 })
      notify(Notification::UPDATED, { :message => 'completed', :subject => @repair })
      redirect_to :action => 'index'
    end
  end
end
