class Admin::EmailTemplatesController < ApplicationController
  before_filter :check_login
  layout 'new_admin'
  protect_from_forgery :except => :async_quickly_email
  ssl_required_for_all
  
  def index
    @selected_tab = 'content'
    @page_title = "Email Templates"
    @templates = EmailTemplate.find :all
  end
  
  def edit
    @selected_tab = 'content'
    @email_template = EmailTemplate.find params[:id]
    @page_title = "Email Templates - #{@email_template.name}"
  end
  
  def create
    et = EmailTemplate.create(params[:email_template])
    notify(Notification::CREATED, et)
    
    redirect_to :action => 'index'
  end
  
  def update
    et = EmailTemplate.find(params[:id])
    updated = et.update_attributes(params[:email_template])
    notify(Notification::UPDATED, et) if updated
    
    redirect_to :action => 'index'
  end
  
  def destroy
    et = EmailTemplate.find(params[:id])
    notify(Notification::DELETED, et)
    et.destroy
    
    redirect_to :action => 'index'
  end

  def async_quickly_email
  	if request.get?
  	  templates = {}
  	  EmailTemplate.find(:all, :order => 'name ASC').each { |t| templates[t.name] = t.id }
  		render :json => templates
  	else
  		begin
  			customer = Customer.find params[:customer_id]
  			et = EmailTemplate.find(params[:template_id])
  			Postoffice.deliver_template(params[:template_id], customer.email, {:customer => customer, :my => current_account})
  			notify(Notification::INFO, { :message => "emailed #{et.notification_summary}", :subject => customer })
  			render :json => { :result => :sent }
  			return
  		rescue
  			logger.info("\n\nERROR: #{$!}\n\n")
  			logger.info($!.backtrace)
  			render :json => { :result => $!.message }
  			return
  		end
  	end
  end
end
