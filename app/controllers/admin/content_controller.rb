class Admin::ContentController < ApplicationController
  before_filter :check_login, :except => [:async_get_package_prices]
  protect_from_forgery :except => [:async_load, :async_save, :async_get_package_prices]
  
  ssl_required_for_all

  def async_load
    render :json => Content.find_by_slug(params[:id])
  end
  
  def async_save
    render :json => Content.find_by_slug(params[:id]).update_attributes({ :html => params[:html] })
  end
  
  def async_list
    render :json => Content.all.collect { |c|
      { :slug => c.slug, :label => c.slug.humanize }
    }
  end
  
  def async_create
    render :json => Content.create(params[:content])
  end
  
  def index
    @selected_tab = 'content'
    @page_title = 'Content'
    render :layout => 'new_admin'
  end
  
  def async_get_package_prices
  	hash = {}
  	Package.find(:all).each { |package| hash[package.id] = package.send("#{params[:home_type].strip}_price") }
  	render :json => hash
  end
end
