class Note < ActiveRecord::Base
  belongs_to :customer

  def date
    self.created_at || (Time.at(self.timestamp).utc if timestamp)
  end
  
  def text
    (self.note_text || '').gsub(/\n/, '<br>')
  end
  
  def notification_summary
    s = self.note_text || ''
    if not s.empty?
      s = '(' + s[0...20]
      s << '...' if self.note_text.length > 20
      s << ')'
    end
    "Note for #{self.customer.notification_summary} #{s}"
  end
  
  def edit_url
    self.customer.edit_url
  end
  
  def to_json(a=nil,b=nil)
    {
      :id => self.id,
      :date => self.date.in_time_zone(EST).strftime("%m/%d/%y %I:%M %p"),
      :text => self.text,
      :agent_name => self.agent_name
    }.to_json
  end
end
