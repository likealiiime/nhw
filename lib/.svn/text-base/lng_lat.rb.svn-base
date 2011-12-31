class LngLat
  attr_accessor :lat, :lng
  
  def initialize(lng, lat)
    @lng = lng; @lat = lat
  end
  
  def to_radians
    LngLat.new(self.lng / 57.29578, self.lat / 57.29578)
  end
  
  def km_distance_to(dest)
    start = self.to_radians
    dest = LngLat.new(dest.lng, dest.lat) if dest.class == Address
    dest = dest.to_radians
    return Math.acos(Math.sin(start.lat) * Math.sin(dest.lat) +
            Math.cos(start.lat) * Math.cos(dest.lat) *
            Math.cos(dest.lng - start.lng)) * 6371.1
  end
  
  def mi_distance_to(dest)
    self.km_distance_to(dest) * 0.62137
  end
  
  def to_s
    "(%.6f, %.6f)" % [self.lat, self.lng]
  end
end

LatLng = LngLat