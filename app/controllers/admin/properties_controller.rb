class Admin::PropertiesController < ApplicationController
  before_filter :check_login
  ssl_required_for_all
  
  def async_get_for_customer
    render :json => Customer.find(params[:id]).properties
  end
  
  def async_update
    property = Address.find(params[:id])
    property.update_attributes(params[:property])
    notify(Notification::CHANGED, { :message => 'changed', :subject => property })
    render :json => property
  end
  
  def async_create
    property = Address.create(params[:property])
    notify(Notification::CREATED, { :message => "added to Customer #{property.addressable.notification_summary}", :subject => property })
    render :json => property
  end
end
