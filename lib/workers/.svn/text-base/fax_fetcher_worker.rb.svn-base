class FaxFetcherWorker < BackgrounDRb::MetaWorker
  set_worker_name :fax_fetcher_worker
  def create(args = nil)
    Notification.notify(Notification::INFO, :subject_summary => "Fax Fetcher", :message => 'started')
    add_periodic_timer(30.minutes) { fetch_every_30 }
    add_periodic_timer(15.minutes) { fetch_every_15 }
  end
  
  def fetch_every_30
    FaxSource.customers.retrieve!
  end
  
  def fetch_every_15
    FaxSource.contractors.retrieve!
  end
end

