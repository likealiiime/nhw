class Admin::FaxesController < ApplicationController
  before_filter :set_selected_tab
  before_filter :check_login
  layout 'new_admin'
  ssl_required_for_all
  
  def index
    @page_title = 'Unassigned Faxes'
  end
  
  def async_list
    render :json => params[:id] ? Fax.unassigned_of_key(params[:id]) : Fax.unassigned
  end
  
  def async_list_for_contractor
    render :json => Fax.for_contractor(params[:id])
  end
  
  def async_list_for_customer
    render :json => Fax.for_customer(params[:id])
  end
  
  def thumbnail
    begin
      send_file("#{RAILS_ROOT}/faxes/thumbnails/#{params[:id].to_i}.png", :filename => "fax_#{params[:id]}_thumbnail.png", :type => 'image/png', :disposition => 'inline')
    rescue ActionController::MissingFile
      fax = Fax.find(params[:id])
      fax.write_pngs!
      retry
    end
  end
  
  def preview
    begin
      send_file("#{RAILS_ROOT}/faxes/previews/#{params[:id].to_i}.png", :filename => "fax_#{params[:id]}_thumbnail.png", :type => 'image/png', :disposition => 'inline')
    rescue ActionController::MissingFile
      fax = Fax.find(params[:id])
      fax.write_pngs!
      retry
    end
  end
  
  def download
    send_file("#{RAILS_ROOT}/faxes/#{params[:id].to_i}.pdf", :type => 'application/pdf', :filename => "fax_#{params[:id]}.pdf")
  end
  
  def async_assignment_search
    render(:json => []) and return if not params[:q] or params[:q].strip.empty?
    
    stripped_q = params[:q].gsub(/[^0-9]/, '')
    # See if it looks like a fax number
    is_fax_number = (params[:q][0..0] == '#') || params[:q].include?('-') || params[:q].include?('(') || params[:q].include?('.')
    # See if it's a valid fax number
    is_fax_number = is_fax_number && (stripped_q.to_i > 0) && (stripped_q.length == 10)
    # Turn it into a fax number
    params[:q] = stripped_q if is_fax_number
    is_string = params[:q].to_i == 0
    collection = []
    
    if is_fax_number and not is_string # Search Contractor Fax Numbers
      collection = Contractor.with_fax(params[:q])
    elsif not is_string # Search Customer IDs
      collection = Customer.find(params[:q].to_i)
    elsif is_string # Search Customer names and Contractor companies
      collection = Customer.with_name_like(params[:q])
      collection |= Contractor.with_company_like(params[:q])
    end
    
    render :json => collection.to_a.collect { |i|
      {
        :id => i.id,
        :ruby_type => i.class.to_s,
        :id_fax => i.class == Contractor ? i.fax : i.contract_number,
        :name_company => i.class == Contractor ? i.company : i.name
      }
    }
  rescue ActiveRecord::RecordNotFound
    render :json => []
  end
  
  def async_assign
    fax = Fax.find(params[:id])
    assignable = params[:assignable_type].capitalize.constantize.find(params[:assignable_id])
    FaxAssignableJoin.create({
      :fax_id => fax.id,
      :assignable_id => assignable.id,
      :assignable_type => params[:assignable_type]
    })
    fax.update_attributes({ :unassigned => false })
    notify(Notification::UPDATED, { :message => "assigned to #{assignable.notification_summary}", :subject => fax })
    render :json => fax
  end
  
  def async_unassign
    fax = Fax.find(params[:id])
    FaxAssignableJoin.find_by_fax_id_and_assignable_id_and_assignable_type(params[:id], params[:assignable_id], params[:assignable_type]).destroy
    fax.update_attributes({ :unassigned => true })
    notify(Notification::UPDATED, { :message => "unassigned", :subject => fax })
    render :json => fax
  end
  
  def destroy
    fax = Fax.find(params[:id])
    fax.destroy
    notify(Notification::DELETED, fax)
    render :json => fax
  end
  
  protected
  
  def set_selected_tab
    @selected_tab = 'dashboard'
  end
end
