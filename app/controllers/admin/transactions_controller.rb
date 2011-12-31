class Admin::TransactionsController < ApplicationController
  before_filter :check_login, :except => [:authorize_silent_post]
  protect_from_forgery :except => [:authorize_silent_post]
  layout 'new_admin', :except => [:authorize_silent_post]
  ssl_required_for_all
  
  def index
    @selected_tab = 'transactions'
    @page_title = "Transactions"
    @transactions_count = Transaction.count
    @transactions = Transaction.paginate(:all, :page => params[:transactions_page], :order => 'created_at DESC', :per_page => 20)
    
    @payments_count = ContractorPayment.count
    @payments = ContractorPayment.paginate(:all, :page => params[:payments_page], :order => 'created_at DESC', :per_page => 20)
  end
  
  def async_get_for_customer
    transactions = Transaction.of_customer(params[:id])
    render :json => transactions.collect { |t|
      {
        :date => with_timezone(t.created_at).strftime("%m/%d/%y %I:%M %p"),
        :result => t.result,
        :amount => "$%5.2f" % t.amount
      }
    }
  end
  
  def authorize_silent_post
    return if params[:x_test_request] == true
    
    # Test in Order of Accuracy
    customer = nil
    if params[:x_invoice_num]
      logger.info("Using x_invoice_num, looking for customer with id: #{params[:x_invoice_num][2..-1]}")
      begin
        customer = Customer.find(params[:x_invoice_num][2..-1])
      rescue ActiveRecord::RecordNotFound
        # pass
      end
    end; if not customer and params[:x_cust_id]
      logger.info("Using x_cust_id, looking for customer with id: #{params[:x_cust_id][2..-1]}")
      begin
        customer = Customer.find(params[:x_cust_id][2..-1])
      rescue ActiveRecord::RecordNotFound
        # pass
      end
    end; if not customer and not params[:x_subscription_id].blank?
      logger.info("Looking for customer with subscription_id: #{params[:x_subscription_id]}")
      customer = Customer.find(:first, :conditions => ['status_id != 2 AND subscription_id LIKE ?', "%#{params[:x_subscription_id]}%"])
    end; if not customer and not params[:x_email].blank?
      logger.info("Looking for customer with email: #{params[:x_email]}")
      customer = Customer.find(:first, :conditions => ['status_id != 2 AND email LIKE ?', "%#{params[:x_email]}%"])
    end
    
    transaction = Transaction.new({
      :response_code => params[:x_response_reason_code],
      :response_reason_text => params[:x_response_reason_text],
      :auth_code => params[:x_auth_code],
      :amount => params[:x_amount],
      :transaction_id => params[:x_trans_id].to_i,
      :subscription_id => params[:x_subscription_id],
      :subscription_paynum => params[:x_subscription_paynum]
    })
    transaction.response_code = -1 if params[:x_type] == 'credit'
    transaction.response_code = -2 if params[:x_type] == 'void'
    if params[:x_type] == 'void' and not params[:x_trans_id].blank?
      trans = Transaction.find_by_transaction_id(params[:x_trans_id].to_i)
      trans.update_attributes({ :response_code => -3 }) if trans
    end
    if customer
      transaction.customer_id = customer.id
      logger.info("Assigned transaction to customer: #{customer.notification_summary}")
    else
      logger.info("Cannot deduce customer")
    end
    
    transaction.original_agent_id = customer.agent_id if customer and customer.agent_id
    saved = transaction.save
    #message = 'paid'
    #message << ", but was #{transaction.result}" if saved and transaction.response_code != 1
    #notify(Notification::CREATED, { :message => message, :subject => transaction }) if saved
    
    render :status => 200, :nothing => true
  end
end
