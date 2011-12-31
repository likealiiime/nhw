class Admin::AgentsController < ApplicationController
  before_filter :check_login
  layout 'new_admin', :only => ['index', 'edit']
  ssl_required_for_all
  
  def index
    @selected_tab = 'agents'
    @page_title = "Agents"
    @agents = Agent.all
  end
  
  def edit
    @selected_tab = 'agents'
    @agent = Agent.find params[:id]
    @page_title = "Agents - #{@agent.name}"
    if params[:from] and params[:to]
      @from = Time.parse(params[:from])
      @to = Time.parse(params[:to])
      @transactions = Transaction.for_agent_between(@agent, @from, @to)
    else
      @transactions = Transaction.for_agent(@agent)
    end
    @total = @transactions.collect{ |t| t.amount if t.approved? }.delete_if { |e| e == nil }.sum
  end
  
  def create
    agent = Agent.create(params[:agent])
    params[:account][:parent_id] = agent.id
    params[:account][:parent_type] = 'Agent'
    account = Account.create(params[:account])
    notify(Notification::CREATED, { :message => 'created', :subject => agent })
    
    redirect_to :action => 'index'
  end
  
  def update
    agent = Agent.find params[:id]
    updated = agent.update_attributes(params[:agent])
    updated = updated and agent.account.update_attributes(params[:account])
    notify(Notification::UPDATED, agent) if updated
    
    if params[:agent][:commission_percentage]
      redirect_to "/admin/agents/edit/#{params[:id]}?from=#{params[:from]}&to=#{params[:to]}"
    else
      redirect_to :action => 'index'
    end
  end
  
  def destroy
    agent = Agent.find params[:id]
    notify(Notification::DELETED, agent)
    agent.destroy
    
    redirect_to :action => 'index'
  end
end
