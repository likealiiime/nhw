require 'test_helper'

class PropertyTest < ActiveSupport::TestCase
  
  fixtures :properties
  fixtures :addresses
  
  def test_address_as_addressable
    p = properties(:los_angeles_property)
    p.address = addresses(:los_angeles)
    assert p.valid?
    assert p.save!
  end
  
  def test_property_bad_address
    p = properties(:new_york_property)
    p.address = Address.new(:street1 => "123 Street", :state => "NY", :zip_code => "10001")
    assert !p.valid?
    assert p.address.errors.on(:city)
  end

  def test_destroy_addressable
    p = properties(:los_angeles_property)
    p.address = addresses(:los_angeles)
    assert p.valid?
    assert p.save!

    property_id = p.id
    address_id = p.address.id
    
    assert_not_nil property_id
    assert_not_nil address_id
    
    assert_equal Property.all( :conditions => { :id => property_id } ).size, 1
    assert_equal Address.all( :conditions => { :id => address_id } ).size, 1

    p.destroy
    
    assert Property.all( :conditions => { :id => property_id } ).empty?
    assert Address.all( :conditions => { :id => address_id } ).empty?
  end

end
