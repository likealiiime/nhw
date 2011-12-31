require 'net/https'
require 'uri'
require 'rexml/document'
include REXML

class Contractor < ActiveRecord::Base
  
  NUMBERS_SEARCH = (0..9).collect { |n| "'#{n}'" }.join(',')
  
  # relationships
  has_one   :account, :as => :parent, :dependent => :destroy
  has_one   :address, :as => :addressable, :dependent => :destroy 
  has_many  :repairs, :order => 'created_at DESC'
  has_many  :payments, :class_name => 'ContractorPayment'
  has_many  :claims,  :through => :repairs, :order => "created_at DESC" do
    def between_dates(from, till)
      find(:all, :conditions => { :created_at => from .. till } )
    end
  end
  has_many :fax_assignable_joins, :as => :assignable
  
  # validations
  validates_presence_of           :company
  validates_format_of             :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i,
                                  :allow_nil => true, :allow_blank => true,
                                  :message => "must be of format user@domain.ext"
  
  named_scope :starting_with_letter, lambda { |letter|
    { :conditions => ['LEFT(`company`, 1) = ? ', letter], :order => 'company ASC' }
  }
  named_scope :starting_with_non_letter, {
    :conditions => ["LEFT(`company`, 1) IN (#{Contractor::NUMBERS_SEARCH})"],
    :order => 'company ASC'
  }
  named_scope :with_fax, lambda { |f|
    { :conditions => Customer.telecom_number_strip_condition('fax', f) }
  }
  named_scope :with_company_like, lambda { |c|
    like = '%' << c.split(' ').join('%') << '%'
    { :conditions => ['company LIKE ?', like] }
  }
  
  def edit_url
    "/admin/contractors/edit/#{self.id}"
  end
  
  def notification_summary
    "Contractor #{self.company}"
  end
  
  def to_hash
    {
      :id         => self.id,
      :name       => self.name,
      :first_name => self.first_name,
      :last_name  => self.last_name,
      :fax        => self.fax,
      :phone      => self.phone_number,
      :company    => self.company,
      :flagged    => self.flagged,
      :address    => self.address.to_s,
      :email      => self.email,
      :rating     => self.rating
    }
  end
  
  # Why two nil params? See http://railsforum.com/viewtopic.php?id=19149
  def to_json(one=nil,two=nil)
    self.to_hash.to_json
  end
  
  def to_hash_for_parsing
    hash = self.attributes.dup
    hash[:address] = self.address.to_hash if self.address
    return hash
  end
  
  # generate a name from first, last names
  def name
    [self.first_name, self.last_name].compact.join(' ')
  end
  alias full_name name

  #
  # phone numbers come in different flavors, so narmalize into a single form
  #
  def clean_telecom_numbers
    clean_did(self.phone)
    clean_did(self.mobile)
    clean_did(self.fax)
  end
  
  # provide a formatted phone number
  def phone_number
    if self.phone.empty? then return self.phone end
    formatted_did = clean_did(self.phone)
    format_did(formatted_did)
  end
  
  # provide a formatted mobile number
  # TODO: how to handle ext #
  # TODO: provide a format template to allow for run-time customization: (xxx) xxx-xxxx or xxx-xxx-xxxx or xxx.xxx.xxxx 
  def mobile_number
    if self.mobile.empty? then return self.mobile end
    formatted_did = clean_did(self.mobile)
    format_did(formatted_did)
  end
  
  # provide a formatted fax
  def fax_number
    if self.fax.empty? then return self.fax end
    formatted_did = clean_did(self.fax)
    format_did(formatted_did)
  end
  
  def stars
    '*' * self.rating #&#9733;
  end
  
  protected
  
  def clean_did(did)
    formatted_did = did.gsub('(', '').gsub(')', '').gsub(' ', '').gsub('-', '')
    formatted_did = (formatted_did.length != 10) ? formatted_did[0 .. 9].to_s : formatted_did
    formatted_did
  end
  
  def format_did(did)
    "(" + did[0 .. 2].to_s + ") " + did[3 .. 5].to_s + "-" + did[6 .. 9].to_s
  end
end
