require 'digest/sha1'

class Admin::AdminController < ApplicationController
  ssl_required_for_all
  
  before_filter :set_selected_tab
  customer_can :login, :logout, :authenticate
  contractor_can :login, :logout, :authenticate
  
  before_filter :check_login, :except => ['login', 'logout', 'authenticate']
  
  layout 'admin'
  
  def new
    render :layout => 'new_admin'
  end
  
  def index
    redirect_to "/admin/#{current_account.role}_dashboard"
  end
  
  def claims_dashboard
    @page = session[:last_claims_page] || 1
    @active_statuses = session[:last_active_statuses] || Claim.statuses.collect { |k,v| v }
    @page_title = "Claims"
    @selected_tab = 'index'
    render :layout => 'new_admin'
  end
  
  def sales_dashboard
    @page_title = "Sales"
    @selected_tab = 'index'
    render :action => 'sales_dashboard', :layout => 'new_admin'
  end
  alias :admin_dashboard :sales_dashboard
  
  def login
    @selected_tab = 'login'
  end
  
  def logout
    reset_session
    session[:account_id] = nil
    redirect_to '/'
  end
  
  def authenticate
    account = Account.find_by_email(params[:email])
    if account
      destination = '/admin'
      if account.customer?
        # Temporarily omitted
        #if account.parent.status_id.to_i == 4 and not account.parent.coverage_has_ended?
        destination = "/admin/customers/edit/#{account.parent.id}"
        #else
        #  flash[:not_eligible] = true
        #  redirect_to params[:url_from] || '/admin/admin/login'
        #  return
        #end
      end
      destination = '/admin/repairs' if account.contractor?

      if Digest::SHA1.hexdigest(params[:password]) == account.password_hash
        session[:account_id] = account.id
        session[:timeout_after] = 30.minutes.from_now
        account.update_attributes({
          :last_login_ip => request.remote_ip,
          :last_login_at => Time.now
        })
        
        redirect_to(destination)
        return
      else
        flash[:wrong_password] = true
        redirect_to(params[:url_from] || '/admin/login')
        return
      end
    else
      flash[:wrong_email] = true
      redirect_to(params[:url_from] || '/admin/login')
      return
    end
  end
  
  protected
  
  def set_selected_tab
    @selected_tab = :dashboard
  end
end
