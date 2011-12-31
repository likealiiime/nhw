class Admin::ContractorsController < ApplicationController
  before_filter :check_login
  
  layout 'new_admin', :only => ['index', 'edit', 'find_by_location']
  
  ssl_required_for_all
  
  contractor_can :update_invoice_receipt
  
  def index
    @page_title = 'Contractors'
    @selected_tab = 'contractors'
    @contractor = Contractor.new
    @address = Address.new
  end
  
  def find_by_location
    @radius = params[:radius].to_f or 30.0
    @location = Address.new({ :address => params[:location] })
    @location.geocode
    @addresses = Address.of_contractors_within_radius_of_lat_lng(
     @radius, @location.lat, @location.lng
    ) if @location.geocoded?
    @addresses ||= []
    @page_title = 'Contractors found by location'
    @selected_table = 'contractors'
  end
  
  def async_find_in_radius
    addresses = Address.of_contractors_within_radius_of_lat_lng(
      (params[:radius].to_f or 30.0), params[:lat].to_f, params[:lng].to_f
    )
    # TODO There must be a more elegant way to do this...
    render :json => addresses.collect { |a|
      next unless a.addressable
      c = a.addressable.to_hash
      c[:address] = a.to_hash
      c
    }.reject { |a| a.nil? }
  end
  
  def async_create
    contractor = Contractor.create(params[:contractor])
    params[:address][:address_type] = 'Contractor'
    contractor.create_address(params[:address])
    notify(Notification::CREATED, { :message => 'created', :subject => contractor })
    if contractor.email and not contractor.email.empty?
      result = Account.grant_web_account(contractor)
      if result.length == 8
        Postoffice.deliver_template('Welcome Contractor', contractor.email, {
          :attachments => { 0 => {
            :path => 'app/views/admin/content',
            :filename => 'Nationwide-Contractor_Welcome.pdf',
            :content_type => 'application/pdf'
          }},
          :password => result,
          :contractor => contractor
        })
        notify(Notification::INFO, { :message => 'granted web access', :subject => contractor })
      end
    end
    render :json => contractor.id
  end
  
  def async_get_contractors
    session[:last_contractors_page] = params[:CIPaginatorPage]
    
    contractors = []
    if params[:CIPaginatorPage] == '#'
      contractors = Contractor.starting_with_non_letter
    else
      contractors = Contractor.starting_with_letter(params[:CIPaginatorPage])
    end
    
    render :json => {
      :CIPaginatorPage => params[:CIPaginatorPage],
      :CIPaginatorCollection => contractors.collect { |c|
        {
          :id => c.id,
          :company => c.company,
          :contact => c.name,
          :title => c.job_title.capitalize,
          :email => c.email,
          :phone => c.phone_number,
          :stars => c.stars,
          :flagged => c.flagged
        }
      }
    }
  end
  
  def async_get_web_account
    render :json => Account.for_contractor_id(params[:id]).first || 'null'
  end
  
  def update_invoice_receipt
    Contractor.find(params[:id]).update_attributes(params[:contractor])
    redirect_to :controller => 'repairs', :action => 'index'
  end
  
  def edit
    @selected_tab = 'contractors'
    @contractor = Contractor.find(params[:id])
    @page_title = "Contractors - #{@contractor.company}"
  end
  
  def create
    @contractor = Contractor.new(params[:contractor])
    @address = @contractor.build_address(params[:address])
    if @contractor.save
      notify(Notification::CREATED, { :message => 'created', :subject => @contractor })
      redirect_to :action => 'edit', :id => @contractor.id
    else
      redirect_to :action => 'index'
    end
  end
  
  def async_update
    contractor = Contractor.find(params[:id])
    address = contractor.address || contractor.build_address
    if contractor.update_attributes(params[:contractor]) && address.update_attributes(params[:address])
      contractor.account.update_attributes({ :email => contractor.email }) unless contractor.account.nil?
      notify(Notification::CHANGED, { :message => 'updated', :subject => contractor })
    end
    render :json => contractor
  end
  
  def update
    @contractor = Contractor.find(params[:id])
    @address = @contractor.address || @contractor.build_address
    if @contractor.update_attributes(params[:contractor]) && @address.update_attributes(params[:address])
      unless @contractor.account.nil? then @contractor.account.update_attributes({ :email => @contractor.email }) end
      notify(Notification::CHANGED, { :message => 'updated', :subject => @contractor })
      redirect_to :action => 'index'
    else
      render :action => 'edit', :id => params[:id]
    end
  end
  
  def destroy
    contractor = Contractor.find params[:id]
    contractor.destroy
    redirect_to :action => 'index'
  end
end
