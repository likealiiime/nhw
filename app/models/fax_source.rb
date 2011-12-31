class FaxSource < ActiveRecord::Base
  has_many :faxes
  validates_presence_of :key, :address, :number, :name
  
  def edit_url; ''; end
  
  def notification_summary
    "#{self.name} (#{self.number})"
  end
  
  def to_json(a=nil,b=nil)
    {
      :id => self.id,
      :name => self.name,
      :number => self.number,
      :address => self.address,
      :key => self.key,
      :password => self.password
    }.to_json
  end
  
  def FaxSource.contractors
    FaxSource.find_by_key('contractors')
  end
  
  def FaxSource.customers
    FaxSource.find_by_key('customers')
  end
=begin
  def redownload_fax!(fax)
    File.open("#{RAILS_ROOT}/log/#{self.key}.log", 'a') do |log|
      start = Time.now.in_time_zone(EST)
      log.puts "=== Starting re-retrieval of fax ##{id} at #{start}"
      log.puts "\t= Connecting to imap.gmail.com:993..."
      imap = Net::IMAP.new('imap.gmail.com', 993, true)
      
      log.puts "\t= Logging in as #{self.address}..."
      imap.login(self.address, self.password)
      
      log.puts "\t= Selecting INBOX..."
      imap.select('INBOX')
      
      envelope = nil
      if fax.message_id
        envelope = TMail::Mail.parse(imap.fetch(fax.message_id, 'RFC822')[0].attr["RFC822"])
        log.puts "\t= Fetched message ##{fax.message_id} off the server"
      else
        log.puts "\t= Iterating through ON #{fax.received_at.strftime("%d-%b-%Y")}..."
        imap.search(['ON', fax.received_at.strftime("%d-%b-%Y")]).each do |message_id|
          message = imap.fetch(message_id, 'RFC822')[0].attr["RFC822"]
          envelope = TMail::Mail.parse(message)
          if envelope.date == fax.received_at
            log.puts "\t\t* Found match: #{fax.received_at} == #{envelope.date}. Updating fax..."
            fax.update_attributes({:message_id => message_id})
            break
          end #if
        end #imap.search
      end #if
      
      attachment = envelope.attachments.first
      path = "#{RAILS_ROOT}/faxes/#{fax.id}.pdf"
      File.open(path, 'w') { |pdf|
        bytes = pdf.write(attachment.read)
        log.puts "\t= Wrote #{bytes} bytes to #{path}"
      }
      fax.update_attributes({ :path => path })
      
      list = Magick::ImageList.new(path)
      list[0].resize_to_fit(800).write("#{RAILS_ROOT}/faxes/previews/#{fax.id}.png")
      log.puts "\t= Wrote preview to faxes/previews/#{fax.id}.png"
      list[0].resize_to_fit(64).write("#{RAILS_ROOT}/faxes/thumbnails/#{fax.id}.png")
      log.puts "\t= Wrote thumbnail to faxes/thumbnails/#{fax.id}.png"
      
      log.puts "\t= Logging Out..."
      imap.logout
      
      log.puts "\t= Disconnecting..."
      imap.disconnect unless imap.disconnected?
      
      finish = Time.now.in_time_zone(EST)
      #Notification.notify(Notification::INFO, :subject_summary => "#{num_retrieved} #{self.name} Fax(es)", :message => 'retrieved') 
      log.puts "=== Finished retrieval of new faxes at #{finish}"
      log.puts "=== Took #{finish-start} seconds"
      log.puts
    end #File.open
  end
=end
  def retrieve!
    File.open("#{RAILS_ROOT}/log/#{self.key}.log", 'a') do |log|
      start = Time.now.in_time_zone(EST)
      log.puts "=== Starting retrieval of new faxes at #{start}"
      
      log.puts "\t= Connecting to imap.gmail.com:993..."
      imap = Net::IMAP.new('imap.gmail.com', 993, true)
      
      log.puts "\t= Logging in as #{self.address}..."
      imap.login(self.address, self.password)
      
      log.puts "\t= Selecting INBOX..."
      imap.select('INBOX')
      
      log.puts "\t= Iterating through NOT FLAGGED..."
      num_retrieved = 0
      imap.search(['NOT', 'FLAGGED']).each do |message_id|
        log.puts "\t\t* Message ID is #{message_id}"
        message = imap.fetch(message_id, 'RFC822')[0].attr["RFC822"]
        
        envelope = TMail::Mail.parse(message)
        fax = Fax.new({ :received_at => envelope.date, :source_id => self.id, :message_id => message_id })
        fax.sender_fax_number = envelope.subject.scan(/\d{10}/)[0] || envelope.body.scan(/OS FAX Number\s+?:\s(\d{10})/).flatten[0]
        unless fax.valid_sender_fax_number?
          log.puts "\t\t\tCould not find fax number in subject or body. This does not appear to be a valid fax. Skipping!"
          next
        end
        
        log.puts "\t\t\tThis fax is from #{fax.formatted_sender_fax_number}"
        next unless envelope.attachments.length > 0
        
        fax.save
        attachment = envelope.attachments.first
        path = "#{RAILS_ROOT}/faxes/#{fax.id}.pdf"
        File.open(path, 'w') { |pdf|
          bytes = pdf.write(attachment.read)
          log.puts "\t\t\tWrote #{bytes} bytes to #{path}"
        }
        fax.update_attributes({ :path => path })
        
        begin
          list = Magick::ImageList.new(path)
          if list[0] == nil
            log.puts "\t\t\t/!\\ This fax is corrupt /!\\"
            fax.write_corrupt!
          else          
            list[0].resize_to_fit(800).write("#{RAILS_ROOT}/faxes/previews/#{fax.id}.png")
            log.puts "\t\t\tWrote preview to faxes/previews/#{fax.id}.png"
            list[0].resize_to_fit(64).write("#{RAILS_ROOT}/faxes/thumbnails/#{fax.id}.png")
            log.puts "\t\t\tWrote thumbnail to faxes/thumbnails/#{fax.id}.png"
          end
        rescue Magick::ImageMagickError
          log.puts "\t\t\t/!\\ This fax is corrupt /!\\"
          fax.write_corrupt!
        end
        num_retrieved += 1
        Notification.notify(Notification::CREATED, { :subject => fax, :message => 'retrieved' })
        
        #log.puts "\t\t\tLooking for other faxes from #{fax.formatted_sender_fax_number}..."
        #related_by_sender = Fax.related_by_sender(fax.sender_fax_number).first
        #log.puts "\t\t\t/!\\ Related sender checking has been disabled /!\\"
        #if related_by_sender
        #  fax.assignable = related_by_sender.assignable; fax.save
        #  log.puts "\t\t\tAssigned to #{fax.assignable_summary}"
        #  Notification.notify(Notification::UPDATED, { :message => "assigned to #{fax.assignable_summary}", :subject => fax })
        #else
        #  log.puts "\t\t\tNone found. Looking for Contractor with matching fax number..."
        #  contractor = Contractor.with_fax(fax.sender_fax_number).first
        #  if contractor
        #    fax.assignable = contractor; fax.save
        #    log.puts "\t\t\tAssigned to #{fax.assignable_summary}"
        #    Notification.notify(Notification::UPDATED, { :message => "assigned to #{fax.assignable_summary}", :subject => fax })
        #  else
        #    log.puts "\t\t\tNone found."
        #  end
        #end
        unless RAILS_ENV == 'development'
          imap.store(message_id, "+FLAGS", [:Flagged])
          log.puts "\t\t\tMarked message #{message_id} as FLAGGED"
        end
      end
      log.puts "\t= Logging Out..."
      imap.logout
      
      log.puts "\t= Disconnecting..."
      imap.disconnect unless imap.disconnected?
      
      finish = Time.now.in_time_zone(EST)
      Notification.notify(Notification::INFO, :subject_summary => "#{num_retrieved} #{self.name} Fax(es)", :message => 'retrieved') 
      log.puts "=== Finished retrieval of new faxes at #{finish}"
      log.puts "=== Took #{finish-start} seconds"
      log.puts
    end
  end
  
  def key_hash
    Digest::SHA1.hexdigest(self.key)[0...16]
  end
  
  def password=(password)
    return nil if password.nil? or password.empty?
    cipher = Crypt::Rijndael.new(self.key_hash)
    # Pad the password to meet the min block size of 16 bytes
    self.password_hash = Base64.encode64(cipher.encrypt_string(password.ljust(16, ' ')))
  end
  
  def password
    return '' if password_hash.nil?
    cipher = Crypt::Rijndael.new(self.key_hash)
    # Strip whitespace because it may be padded to make 16 bytes
    cipher.decrypt_string(Base64.decode64(self.password_hash)).strip
  end
end
