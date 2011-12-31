class Postoffice < ActionMailer::Base
  
  def message(recipients, subject, message, inspect='')
    recipients  recipients
    subject     subject
    sent_on     Time.now
    body        :message => message, :inspect => inspect
    content_type 'text/html'
  end
  
  def template(template_id, recipients, data=nil)
  	template = nil
  	if template_id.to_i == 0
  		template = EmailTemplate.find_by_name(template_id)
    else
    	template = EmailTemplate.find(template_id)
    end
    raise "Could not find Email Template: #{template_id}" unless template
    template.data = data
    
    recipients  recipients
    from        'no-reply@nationwidehomewarranty.com'
    subject     template.parsed_subject
    sent_on     Time.now

    part "text/html" do |p|
      p.body = render_message('template', :et => template)
      p.transfer_encoding = 'Quoted-printable'
    end
    
    begin
      if data and data[:attachments]
        #part :content_type => 'multipart/mixed'
        # Rails interprets JSON arrays as hashes with string indices of numbers
        data[:attachments].each { |i, hash|
          attachment :content_type  => hash[:content_type],
                     :body          => File.read("#{RAILS_ROOT}/#{hash[:path]}/#{hash[:filename]}"),
                     :filename      => hash[:filename]
        }
      end
    rescue  # Rescue from and ignore problems attaching so the email at least is delivered
      logger.info("Could not attach to email:\n#{$!.message}")
    end
  end
end
