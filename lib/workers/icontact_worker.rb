class IcontactWorker < BackgrounDRb::MetaWorker
  set_worker_name :icontact_worker
  def create(args = nil)
    #add_periodic_timer(60.minutes) { IContactRequest.process! }
    Notification.notify(Notification::INFO, :subject_summary => "iContact synchronizer (next sync at #{60.minutes.from_now.in_time_zone(EST).strftime('%I:%M%p')})", :message => 'started')
  end
end