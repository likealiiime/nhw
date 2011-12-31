class Notification < ActiveRecord::Base
  belongs_to :actor, :polymorphic => true
  belongs_to :subject, :polymorphic => true
  
  CHANGED   = 'updated'
  UPDATED   = 'updated'
  CREATED   = 'created'
  DELETED   = 'deleted'
  INFO      = 'info'
  PROBLEM   = 'problem'
  
  def is_about_resource?
    [UPDATED, CREATED, DELETED, 'changed'].include?(self.notification_type)
  end
  
  def is_deleted?
    self.notification_type == DELETED
  end
  
  def is_info?
    self.notification_type == INFO
  end
  
  def css_class
    case self.notification_type
    when UPDATED, CREATED, DELETED, 'changed'
      "notification_resource"
    when INFO
      "notification_info"
    when PROBLEM
      "notification_problem"
    end
  end
  
  def image_url
    "/images/icons/notifications/#{self.notification_type}.png"
  end
  
  def formatted_date
    self.created_at.in_time_zone(EST).strftime("on %m/%d/%y at %I:%M %p")
  end
  
  def subject_link
    s = self.subject_summary
    s = "<a href=\"#{self.subject.edit_url}\">#{s}</a>" if self.subject and not self.is_deleted?
    return s
  end
  
  def self.notify(type, options, account=nil)
    begin
      options = { :subject => options } if options.class != Hash
      options[:notification_type] = type
      options[:message] = type if not options[:message]
      options[:actor] = account.parent if not options[:actor] and account and not account.empty?
      options[:actor_summary] = options[:actor].notification_summary if not options[:actor_summary] and options[:actor]
      options[:subject_summary] = options[:subject].notification_summary if options[:subject] and not options[:subject_summary] 
      options[:level] = 5 if not options[:level]
    
      n = Notification.create(options)
    rescue
      logger.info("Could not create Notification:\n#{options.inspect}\nbecause: #{$!.to_s}")
    end
  end
end
