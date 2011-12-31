class Admin::CancellationReasonsController < ApplicationController
  before_filter :check_login
  ssl_required_for_all
  
  def async_list
    render :json => CancellationReason.all
  end
  
  def async_update
    reason = CancellationReason.find(params[:id])
    reason.update_attributes(params[:reason])
    notify(Notification::UPDATED, reason)
    render :json => reason
  end
  
  def async_create
    reason = CancellationReason.create(params[:reason])
    notify(Notification::CREATED, reason)
    render :json => reason
  end
end
