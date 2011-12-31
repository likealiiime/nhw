class Admin::FaxSourcesController < ApplicationController
  before_filter :check_login
  layout 'new_admin'
  ssl_required_for_all
  
  def async_list
    render :json => FaxSource.all
  end
  
  def async_update
    source = FaxSource.find(params[:id])
    source.update_attributes(params[:fax_source])
    notify(Notification::UPDATED, source)
    render :json => source
  end
  
  def retrieve
    source = FaxSource.send(params[:id])
    source.retrieve!
    render :json => {}
  end
end
