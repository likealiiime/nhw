class Admin::CreditCardsController < ApplicationController
  before_filter :check_login
  before_filter :find_customer, :only => [:list_for_customer, :add_for_customer]
  before_filter :find_card, :only => [:destroy, :update, :bill]
  ssl_required_for_all
  
  def update
    @card.update_attributes(params[:card])
    @card.address.update_attributes(params[:address])
    render :json => @card
  end
  
  def bill
    amount = params[:amount].to_f
    response = @card.charge_cents!(amount * 100.0) if amount > 0.0
    if response && response.success?
      note = Note.create({
        :customer_id => @card.customer.id,
        :note_text => "Billed $%.2f to card ending in #{@card.last_4}." % amount,
        :agent_name => current_account.parent.name,
        :author_id => current_account.parent.id
      })
      notify(Notification::CREATED, { :message => 'created', :subject => note })
    else
      reason = response ? ", but it failed because: #{response.params['response_reason_text']}." : '.'
      note = Note.create({
        :customer_id => @card.customer.id,
        :note_text => "Attempted to bill $%.2f to card ending in #{@card.last_4}#{reason}" % amount,
        :agent_name => current_account.parent.name,
        :author_id => current_account.parent.id
      })
      notify(Notification::CREATED, { :message => 'created', :subject => note })
    end
    render :json => response ? response.params : nil
  end
  
  def destroy
    @card.destroy
    render :json => @card
  end
  
  def list_for_customer
    render :json => @customer.credit_cards
  end
  
  def add_for_customer
    card = @customer.credit_cards.create({
      :first_name => @customer.first_name,
      :last_name  => @customer.last_name,
      :phone => @customer.customer_phone,
      :exp_date => @customer.expirationDate,
      :number => @customer.credit_card_number.blank? ? '1234123412340000' : @customer.credit_card_number
    })
    prexisting_address = @customer.billing_address || @customer.addresses.first
    billing_address = prexisting_address ?
                        prexisting_address.duplicate_for_addressable!(card) :
                        Address.create({
                          :address => '123 Maple St', :city => 'Nowhere', :state => 'KS', :zip_code => '12345',
                          :addressable_type => 'CreditCard', :addressable_id => card.id
                        })
    card.update_attributes({ :address_id => billing_address.id })
    render :json => card
  end
  
  protected
  
  def find_customer
    @customer = Customer.find(params[:id])
  end
  
  def find_card
    @card = CreditCard.find(params[:id])
  end
end
