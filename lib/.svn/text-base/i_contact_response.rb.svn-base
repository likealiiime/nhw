require 'rexml/document'
include REXML

class IContactResponse
  attr_reader :xml, :error_code, :error_message
  
  def initialize(body)
    @xml = Document.new(body)
    unless self.successful?
      @error_code = xml.root.elements['error_code'].text.to_i
      @error_message = xml.root.elements['error_message'].text
    end
  end
  
  def self.failure
    IContactResponse.new('<?xml version="1.0" encoding="UTF-8"?><response status="failed"><error_code>-1</error_code><error_message>General Failure</error_message></response>')
  end
  
  def self.limit
    IContactResponse.new('<?xml version="1.0" encoding="UTF-8"?><response status="limit"><error_code>-2</error_code><error_message>Reached 60 requests per minute limit</error_message></response>')
  end
  
  def successful?
    @xml.root.attributes['status'] == 'success'
  end
  
  def limit?
    @xml.root.attributes['status'] == 'limit'
  end
  
  def to_s
    o = self.successful? ? "" : "Request was unsuccessful: (#{@error_code}) #{@error_message}\n"
    @xml.write(o, 1)
    return o
  end
end