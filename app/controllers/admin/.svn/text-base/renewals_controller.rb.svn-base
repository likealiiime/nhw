class Admin::RenewalsController < ApplicationController
  before_filter :check_login
  ssl_required_for_all
  
  def async_get_for_customer
    render :json => Customer.find(params[:id]).renewals, :layout => false
  end
  
  def async_create_for_customer
    params[:renewal][:customer_id] = params[:id]
    renewal = Renewal.create(params[:renewal])
    notify(Notification::CREATED, { :message => 'created', :subject => renewal })
    render :json => renewal, :layout => false
  end
end
