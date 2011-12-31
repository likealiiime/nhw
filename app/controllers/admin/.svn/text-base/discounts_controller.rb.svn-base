class Admin::DiscountsController < ApplicationController
  before_filter :check_login, :except => [:async_validate]
  layout 'new_admin', :except => [:async_validate]
  protect_from_forgery :except => :async_validate
  
  ssl_required_for_all
  
  def index
    @selected_tab = 'content'
    @page_title = "Discounts"
    @discounts = Discount.find(:all)
  end
  
  def edit
    @selected_tab = 'content'
    @discount = Discount.find params[:id]
    @page_title = "Discounts - #{@discount.code}"
  end
  
  def create
    params[:discount][:value].gsub!(/(\$|\%)/, '').to_f
    if params[:is_percentage] then params[:discount][:value] = params[:discount][:value].to_f * 0.01 end
    discount = Discount.create(params[:discount])
    notify(Notification::CREATED, discount)
    
    redirect_to :action => 'index'
  end
  
  def update
    params[:discount][:value].gsub!(/(\$|\%)/, '').to_f
    if params[:is_percentage] then params[:discount][:value] = params[:discount][:value].to_f * 0.01 end
    discount = Discount.find(params[:id])
    updated = discount.update_attributes(params[:discount])
    
    notify(Notification::UPDATED, discount) if updated
    
    redirect_to :action => 'index'
  end
  
  def destroy
    discount = Discount.find(params[:id])
    notify(Notification::DELETED, discount)
    discount.destroy
    redirect_to :action => 'index'
  end
  
  def async_validate
    Discount.find(:all).each do |discount|
      if params[:discount_code] == discount.code and discount.is_valid?
        Customer.find(params[:id]).update_attributes({ :discount_id => discount.id }) if params[:id]
        render :json => { :validated => discount.value, :discount_id => discount.id }
        return
      end
    end
    
    render :json => { }
  end
end
