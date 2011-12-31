class Coverage < ActiveRecord::Base
  named_scope :all_optional, :conditions => ['optional = ?', 1]
  
  def to_s
    "#{self.coverage_name} $%5.2f" % self.price
  end
end
