class Discount < ActiveRecord::Base
  has_many :customers
  
  def code
    if self.is_monthly
      "NW#{self.starts_at.strftime("%b").upcase}#{(self.value*100).to_i}"
    else
      self.name
    end
  end
  
  def amount
    if self.value <= 1.0
      "#{(self.value*100).to_i}%"
    else
      "$%4.2f" % self.value
    end
  end
  
  def is_percentage?
    self.value <= 1.0
  end
  
  def is_valid?
    Time.now >= self.starts_at and Time.now <= (self.ends_at || Time.now)
  end
  
  def notification_summary
    "Discount #{self.code}"
  end
  
  def edit_url
    "/admin/discounts/edit/#{self.id}"
  end
end