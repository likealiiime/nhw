# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.
require 'net/smtp'

class ApplicationController < ActionController::Base
  include SslRequirement
  include CustomerCan
  
  FOUR_OH_FOUR_EXCEPTIONS = [ActionController::UnknownAction, ActionController::RoutingError]
  IGNORABLE_EXCEPTIONS = [ActionController::InvalidAuthenticityToken, ActionController::RoutingError, Net::SMTPFatalError]
  
  helper :all # include all helpers, all the time

  # See ActionController::RequestForgeryProtection for details
  # Uncomment the :secret if you're not using the cookie session store
  protect_from_forgery # :secret => 'fbcea9c9a5bedc704d5c31667f798407'
  
  # See ActionController::Base for details 
  # Uncomment this to filter the contents of submitted sensitive data parameters
  # from your application log (in this case, all fields with names like "password").
  filter_parameter_logging :credit_card_number, :password
  
  def current_account
    session[:account_id].nil? ? Account.empty_account : Account.find(session[:account_id])
  end
  
  def with_timezone(time)
    #logger.debug("time = #{time}")
    if time.nil? then return "" end
  	time + current_account.timezone.hours + (time.isdst ? 1.hours : 0.hour)
  end
  
  #
  # retrieve the per_page request parameter or use a default value if request parameter not found
  #
  def get_per_page(params, default = 20)
    (params[:per_page]) ? params[:per_page].to_i : default
  end
  
  def rescue_action_in_public(exception)
    if FOUR_OH_FOUR_EXCEPTIONS.include?(exception.class)
      #Postoffice.deliver_message(
      #  ['admin@nationwidehomewarranty.com'],
      #  'Page Not Found',
      #  "The following page was errantly accessed:",
      #  "http://www.nationwidehomewarranty.com/#{params[:controller] != 'site' ? params[:controller] + '/' : ''}#{params[:action]}"
      #) unless IGNORABLE_EXCEPTIONS.include?(exception.class)
      render :file => "#{RAILS_ROOT}/public/404.html", :layout => 'nhw', :status => 404
      return
    else
      Postoffice.deliver_message(
        ['sherrod@softilluminations.com'],
        "Error on Nationwide: #{exception.class.to_s}",
        "<em>#{exception.to_s}</em> in #{params[:controller]}##{params[:action]}",
        exception.backtrace.join("\n").to_s.gsub('<','&lt;').gsub('>', '&gt;') << "\n\n\n" << params.inspect.to_s
      ) unless IGNORABLE_EXCEPTIONS.include?(exception.class)
      render :file => "#{RAILS_ROOT}/public/500.html", :layout => 'nhw', :status => 500
      return
    end
  end

  def local_request?
    false
  end
  
  def notify(type, options)
    Notification.notify(type, options, current_account)
  end
  
  protected
  
  def check_login
    @current_account = current_account
    if @current_account.empty? or Time.now > (session[:timeout_after] || 1.second.ago)
      session[:account_id] = nil
      redirect_to '/admin/login'
    else
      session[:last_customers_async_list_page] ||= {}
      session[:timeout_after] = 30.minutes.from_now
    end
  end
end
