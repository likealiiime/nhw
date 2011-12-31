class Fax < ActiveRecord::Base
  belongs_to :source, :class_name => 'FaxSource'
  has_many :fax_assignable_joins, :dependent => :destroy
  
  validates_presence_of :source_id
  validates_numericality_of :source_id
  
  named_scope :for_contractor, lambda { |id|
    { :include => :fax_assignable_joins, :conditions => ["fax_assignable_joins.assignable_id = ? AND fax_assignable_joins.assignable_type = 'Contractor'", id] }
  }
  
  named_scope :for_customer, lambda { |id|
    { :include => :fax_assignable_joins, :conditions => ["fax_assignable_joins.assignable_id = ? AND fax_assignable_joins.assignable_type = 'Customer'", id] }
  }
  
  named_scope :unassigned, { :conditions => { :unassigned => true } }
  
  named_scope :from_source_key, lambda { |key|
    { :conditions => {:source_id => FaxSource.find_by_key(key).id} }
  }
  
  named_scope :related_by_sender, lambda { |n|
    { :include => :fax_assignable_joins, :conditions => ["sender_fax_number = ? AND fax_assignable_joins.assignable_id != '' AND fax_assignable_joins.assignable_type != ''", n] }
  }
  
  named_scope :unassigned_of_key, lambda { |key|
    { :conditions => { :source_id => FaxSource.find_by_key(key).id, :unassigned => true } }
  }
  
  def to_json(a=nil,b=nil)
    {
      :id => self.id,
      :received_at => self.received_at.in_time_zone(EST).strftime("%m/%d/%y %I:%M %p"),
      :formatted_sender_fax_number => self.formatted_sender_fax_number,
      :sender_fax_number => self.sender_fax_number,
      :assignables => self.assignables.collect { |a|
        {
          :id => a.id,
          :type => a.class.to_s,
          :summary => (a.nil? ? "Assignable is nil" : a.notification_summary)
        }
      }
    }.to_json
  end
  
  def pdf_path
    "#{RAILS_ROOT}/faxes/#{self.id}.pdf"
  end
  
  def preview_path
    "#{RAILS_ROOT}/faxes/previews/#{self.id}.png"
  end
  
  def thumbnail_path
    "#{RAILS_ROOT}/faxes/thumbnails/#{self.id}.png"
  end
  
  def write_pngs!
    if self.is_corrupt?
      self.write_corrupt!
    else
      list = Magick::ImageList.new(self.pdf_path)
      list[0].resize_to_fit(800).write(self.preview_path)
      list[0].resize_to_fit(64).write(self.thumbnail_path)
    end
  end
  
  def valid_sender_fax_number?
    (self.sender_fax_number =~ /^\d{10}$/) == 0 
  end
  
  def formatted_sender_fax_number
    "(#{self.sender_fax_number[0...3]}) #{self.sender_fax_number[3...6]}-#{self.sender_fax_number[6...10]}"
  end
  
  def edit_url; ''; end
  
  def notification_summary
    "#{self.source.name.singularize} Fax from #{self.formatted_sender_fax_number}"
  end
  
  def assignables
    FaxAssignableJoin.for_fax(self).collect(&:assignable)
  end
  
  def assignable_summaries
    self.assignables.collect(&:notification_summary)
  end
  
  def write_corrupt!
    base = "#{RAILS_ROOT}/faxes"
    list = Magick::ImageList.new("#{RAILS_ROOT}/public/images/admin/corrupt_fax.png")
    list[0].write(self.preview_path)
    list[0].resize_to_fit(64).write(self.thumbnail_path)
    return self
  end
  
  def is_corrupt?
    base = "#{RAILS_ROOT}/faxes"
    pdf_size = File.size?(self.pdf_path)
    is_corrupt = false
    if pdf_size < 1000
      # PDF is likely corrupt. Test first
      begin
        list = Magick::ImageList.new(self.pdf_path)
        if list[0].nil?
          self.write_corrupt!
          is_corrupt = true
        end
      rescue Magick::ImageMagickError
        is_corrupt = true
      end
    end
    return is_corrupt
  end
end
