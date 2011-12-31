class Package < ActiveRecord::Base
  has_many :customers
  
  HOME_TYPES = ['single', 'condo', 'duplex', 'triplex', 'fourplex'].freeze
end
