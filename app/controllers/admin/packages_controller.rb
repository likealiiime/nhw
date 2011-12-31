class Admin::PackagesController < ApplicationController
	before_filter :check_login
	layout 'new_admin'
	ssl_required_for_all
	
	def index
		@selected_tab = "content"
		@page_title = "Packages"
		@packages = Package.find(:all)
		@coverages = Coverage.find_all_by_optional(1)
	end
	
	def update
		params[:package].each { |id, hash| Package.find(id).update_attributes(hash) }
		notify(Notification::UPDATED, { :subject_summary => 'Packages'})
		redirect_to :action => 'index'
	end
	
	def update_coverages
	  params[:coverage].each { |id, hash| Coverage.find(id).update_attributes(hash) }
	  notify(Notification::UPDATED, { :subject_summary => 'Coverage Addons'})
	  redirect_to :action => 'index'
	end
end
