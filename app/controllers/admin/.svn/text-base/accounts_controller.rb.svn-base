class Admin::AccountsController < ApplicationController
  before_filter :check_login
  ssl_required_for_all
  
  def async_reset_password
    klass = params[:object_type].constantize
    object = klass.send('find', params[:id])
    if object.account.nil?
      render :json => { :text => "#{object.name} does not have a web account." }
    else
      render :json => { :text => object.account.reset_password }
    end
  end
  
  # Expects id and object_type
  # object_type must respond to #name and #email
  def async_grant_web_account
    params[:email_template_name] ||= 'Welcome'
    klass = params[:object_type].constantize
    object = klass.send('find', params[:id])
    result = Account.grant_web_account(object)
    
    if result.length == 8
      Postoffice.deliver_template(params[:email_template_name], object.email, {
        :attachments => params[:attachments],
        :customer => object,
        :password => result,
        :contractor => object
      })
      notify(Notification::INFO, { :message => 'granted web access', :subject => object })
      
      render :json => {
        :text => "#{object.name} has been granted a web account. Their password is \"#{result}\", and they have been emailed the \"#{params[:email_template_name]}\" email."
      }
    else
      render :json => { :text => result }
    end
  end
end
