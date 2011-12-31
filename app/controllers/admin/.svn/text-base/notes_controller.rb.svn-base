class Admin::NotesController < ApplicationController
  before_filter :check_login
  ssl_required_for_all
  
  def async_get_for_customer
    render :json => Customer.find(params[:id]).notes
  end
  
  def async_create
    params[:note][:agent_name] = @current_account.parent.name
    note = Note.create(params[:note])
    notify(Notification::CREATED, { :message => 'created', :subject => note })
    render :json => note
  end
  
  def async_update
    note = Note.find(params[:id])
    note.note_text = params[:note][:note_text]
    updated = note.save
    notify(Notification::CHANGED, { :message => 'updated', :subject => note }) if updated
    render :json => note
  end
  
  def create
    note = Note.create(params[:note])
    notify(Notification::CREATED, { :message => 'created', :subject => note })
    redirect_to "/admin/customers/edit/#{note.customer_id}#notes"
  end

  #-----------------------------------------
  def add
    @contractorID = session[:account_id]
    @repair = Repair.find(:all,:conditions => ['contractor_id = ?', @contractorID])
    render :layout => 'admin.html.erb'	
  end

  #-----------------------------------------
  def add_note		
    if request.post?
      note = Note.create(params[:note])
      redirect_to "/admin/notes/add"
    else
      @note = Note.new
      render :layout => 'admin.html.erb'
    end
  end
  
 #-----------------------------------------
  def view_note
    @contractorID = session[:account_id]
    @note =  Note.find(:all,:conditions => ['repair_id = ?',params[:id]]) 
    render :layout => 'admin.html.erb'
  end
  
  #-----------------------------------------
  def rating
    render :layout => 'admin.html.erb'
  end  
end
