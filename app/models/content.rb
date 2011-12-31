class Content < ActiveRecord::Base
  def to_json(a=nil,b=nil)
    self.attributes.to_json
  end
  
  def self.for(slug)
    c = Content.find_by_slug(slug.to_s)
    c ? c.html : "No such slug - #{slug}"
  end
end
