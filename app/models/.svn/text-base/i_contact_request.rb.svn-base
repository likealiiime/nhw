class IContactRequest < ActiveRecord::Base
  LEFT_MESSAGE_LIST_ID = 226966
  FOLLOW_UP_LIST_ID = 226967

  @@api_tok = nil
  @@api_seq = nil
  @@last_login = Time.now
  @@logfile = nil
  @@thread = nil
  
  # This is just a loop throttled at 1 iteration per 1.1 seconds for
  # the sake of iContact's ridiculous 60 request/min rule. At 1.1s,
  # this will make 54 requests per minute
  def self.process!
    @@thread.kill if @@thread
    # Operate on only the first 3000 records because at 1.1 second
    # per iteration, 3000 records can be processed in about 55 minutes
    @@thread = Thread.new(IContactRequest.find(:all, :limit => 3000)) { |requests|
      count, total = 0, requests.length
      requests.each do |request|
        response = request.call
        request.log(response)
        if response.successful?
          #@@logfile.puts "*** Success!"
          request.destroy
          count += 1
        elsif response.error_code == 408
          #@@logfile.puts "*** Bad email; dequeued."
          request.destroy
        else
          #@@logfile.puts "*** Failure!"
        end
        sleep 1.1
      end # requests.each
      @@logfile.close
      @@logfile = nil
      
      Notification.notify(count == total ? Notification::INFO : Notification::PROBLEM, {
        :subject_summary => "#{count} of #{total} iContact changes", :message => "synced"
      })
    }
  end
  
  def self.left_message_subscription(subscribe=true)
    <<-XML
<?xml version="1.0" encoding="UTF-8"?>
    <subscription id="#{LEFT_MESSAGE_LIST_ID}">
    	<status>#{subscribe ? '' : 'un'}subscribed</status>
    </subscription>
    XML
  end

  def self.follow_up_subscription(subscribe=true)
    <<-XML
<?xml version="1.0" encoding="UTF-8"?>
    <subscription id="#{FOLLOW_UP_LIST_ID}">
    	<status>#{subscribe ? '' : 'un'}subscribed</status>
    </subscription>
    XML
  end
  
  def self.log(request, message)
    @@logfile = File.open("#{RAILS_ROOT}/log/icontact.log", 'a') unless @@logfile
    @@logfile.puts "--- #{Time.now.in_time_zone(EST)} - #{request.id}"
    @@logfile.puts "- #{request.path}"
    @@logfile.puts request.put
    @@logfile.puts "- #{message.to_s}"
    @@logfile.puts "--- #{IContactRequest.count} requests remaining"
    @@logfile.puts
  end
  
  def log(message)
    IContactRequest.log(self, message)
  end
        
  def call
    begin
      login = IContactRequest.login unless (not @@api_tok.nil? and not @@api_seq.nil?) or (@@last_login <= 15.minutes.ago)
      if login and not login.successful?
        Postoffice.deliver_message(
          ['sherrod@softilluminations.com'],
          "Failed iContact Login",
          "#{login.error_message} (#{login.error_code})", login.to_s
        )
        return login || IContactResponse.failure
      end
      return IContactRequest.request(self.path, self.put)
    rescue
      Postoffice.deliver_message(
        ['sherrod@softilluminations.com'],
        "Unhandled Exception re: IContactRequest#call",
        "Exception: #{$!.to_s}<br/>IContactRequest: #{self}", $!.backtrace.join("\n").to_s.gsub('<','&lt;').gsub('>', '&gt;')
      )
      self.log("The queue will abort due to exception: #{$!.to_s}\nIContactRequest: #{self}")
      return IContactResponse.failure
    end
  end

  private

  def self.login
    response = IContactRequest.request("auth/login/morris@nationwidehomewarranty.com/#{Digest::MD5.hexdigest('moandabe07')}")
    if response.successful?
      @@api_tok = response.xml.root.elements['auth'].elements['token'].text
      @@api_seq = response.xml.root.elements['auth'].elements['seq'].text.to_i
      @@last_login = Time.now
      #logger.info("Sucessfully authenticated with iContact at #{@@last_login}")
    end
    return response
  end

  def self.request(path, put=nil)
    ### IMMEDIATE FAILURE ###
    return IContactResponse.failure
    
    if put
      put.gsub!(/&/, '')
      xml = Document.new(put)
      if xml.root.name == 'contact'
        md = xml.root.elements['email'].text.to_s.match(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/)
        xml.root.elements['email'].text = md[1] + '@' + md[2] if md && md[1] && md[2]
        xml.root.elements['email'].text.gsub!(/\s/, '') if xml.root.elements['email'].text
      end
      put = ''
      xml.write(put, 0)
      put = put.to_s.gsub(/\n/, '')
    end
    
    params = [['api_key', "slK5VadopvE5zjc49rBpHaHJfgxlvBfN"]]
    # API Signature is Shared Secret + path + (parameter+value)
    params << ['api_sig', "NQJyQMM58h1yr4sqlTFSUds0kPbFggjT#{path}api_keyslK5VadopvE5zjc49rBpHaHJfgxlvBfN"]
    # Add the api_put parameter if necessary
    params[1][1] << "api_put#{put}" if put
    # Omit api_tok and api_seq if performing a login
    unless path.include?('auth/login')
      params[1][1] << "api_seq#{@@api_seq}api_tok#{@@api_tok}"
      params << ['api_tok', @@api_tok]
      params << ['api_seq', @@api_seq]
      @@api_seq ||= 0
      @@api_seq += 1
    end

    # Hash the api_seq and create a query string
    params[1][1] = Digest::MD5.hexdigest(params[1][1])
    query_string = params.collect { |k,v|
      k + '=' + v.to_s
    }.join('&')
    
    response = nil
    url = URI.parse("http://api.icontact.com/icp/core/api/v1.0/#{path}/")
    if put
      response = Net::HTTP.new(url.host).put(url.path + "?#{query_string}", put)
    else
      response = Net::HTTP.new(url.host).get(url.path + "?#{query_string}")
    end
    
    if response.class == Net::HTTPServiceUnavailable # 503
      Postoffice.deliver_message(
        ['sherrod@softilluminations.com'],
        "HTTP Response 503 re: iContact Limit Warning",
        "The queue will be aborted", response.class.to_s
      )
      return IContactResponse.limit
    elsif response.class == Net::HTTPOK || response.class == Net::HTTPFound
      return IContactResponse.new(response.body)
    else
      Postoffice.deliver_message(
        ['sherrod@softilluminations.com'],
        "Unhandled HTTP Response re:iContact",
        "", response.class.to_s
      )
      return IContactResponse.failure
    end
  rescue  # Allow for silent failure
    logger.info($!)
    logger.info($!.backtrace)
    return IContactResponse.failure
  end #self.request
end #class IContactRequest