class Admin::SettingsController < ApplicationController
  before_filter :check_login
  layout 'new_admin'
  ssl_required_for_all
  
  def index
    @selected_tab = 'settings'
    @page_title = 'Application Settings'
  end
end
