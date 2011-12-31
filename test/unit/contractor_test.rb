require 'test_helper'

class ContractorTest < ActiveSupport::TestCase
  fixtures :contractors
  fixtures :addresses
  
  def test_should_create_contractor
    assert_difference 'Contractor.count' do
      contractor = create_contractor
      assert !contractor.new_record?, "#{contractor.errors.full_messages.to_sentence}"
    end
  end

  def test_address_as_addressable
    c = contractors(:los_angeles_contractor)
    c.address = addresses(:los_angeles)
    assert c.valid?, "#{c.errors.full_messages.to_sentence}"
    assert c.save!, "#{c.errors.full_messages.to_sentence}"
  end
  
  def test_contractor_bad_address
    c = contractors(:new_york_contractor)
    c.address = Address.new(:street1 => "123 Street", :state => "NY", :zip_code => "10001")
    assert !c.valid?, "#{c.errors.full_messages.to_sentence}"
    assert c.address.errors.on(:city)
  end

  def test_contractor_bad_email
    assert_no_difference 'Contractor.count' do
      contractor = create_contractor({ :email => "bad.email%joes.com"})
      assert !contractor.valid?, "#{contractor.errors.full_messages.to_sentence}"
      assert contractor.errors.on(:email)
    end
  end

  def test_formatted_telecom
    c = contractors(:los_angeles_contractor)
    assert_equal c.phone_number, "(310) 555-1212"
    assert_not_equal c.fax, "310-555-1221"
  end
  
  protected
  
  def create_contractor(options = {})
    contractor = Contractor.new({ :company => "Contractor Company" }.merge(options))
    contractor.save! if contractor.valid?
    contractor
  end
  
end
