class Admin::NotificationsController < ApplicationController
  before_filter :check_login
  ssl_required_for_all
  
  layout 'new_admin'
  
  def index
    @page_title = 'Notifications'
    @selected_tab = 'dashboard'
    @notifications = Notification.find(:all, :order => 'created_at DESC', :limit => 50)
  end
end
