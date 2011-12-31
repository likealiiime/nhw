require 'test_helper'

class AddressTest < ActiveSupport::TestCase
  
  # include the fixtures
  fixtures :addresses

  def test_should_create_address
    assert_difference 'Address.count' do
      address = create_address
      assert !address.new_record?, "#{address.errors.full_messages.to_sentence}"
    end
  end

  def test_invalid_presence
    assert_no_difference 'Address.count' do
      address = create_address(:street1 => nil)
      assert address.errors.on(:street1)
      address = create_address(:city => nil)
      assert address.errors.on(:city)
      address = create_address(:state => nil)
      assert address.errors.on(:state)
      address = create_address(:zip_code => nil)
      assert address.errors.on(:zip_code)
    end
  end
  
  def test_invalid_lengths
    address = Address.new(:street1 => "1234", :city=> "1", :state => "1", :zip_code => "1234")
    if !address.valid?
      assert address.errors.on(:street1)
      assert address.errors.on(:city)
      assert address.errors.on(:state)
      assert address.errors.on(:zip_code)
    end
  end
  
  def test_city_state
    assert_equal addresses(:los_angeles).city_state, "Los Angeles, CA"
  end
  
  def test_city_state_zip
    assert_equal addresses(:los_angeles).city_state_zip, "Los Angeles, CA 90001"
  end
  
  def test_short_form
    assert_equal addresses(:new_york).short_form, "456 Broadway New York, NY 10001"
  end
  
  protected
  
  def create_address(options = {})
    record = Address.new({:street1 => "123 Street", :city => "Los Angeles", :state => "CA", :zip_code => "90001"}.merge(options))
    record.save! if record.valid?
    record
  end
end
