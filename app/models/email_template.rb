class EmailTemplate < ActiveRecord::Base
  attr_accessor :data
  
  def edit_url
    "/admin/email_templates/edit/#{self.id}"
  end
  
  def notification_summary
    "&ldquo;#{self.name}&rdquo; Template"
  end
  
  def parsed_subject
 		return self.parse(self.subject)
  end
  
  def parse(s)
		return s.gsub(/\{(.+?)\s(.+?)\}/) do |match|
			begin
				case $1
				when 'the'
					@data[$2.to_sym]
				when 'customer'
					if @data[:customer] then @data[:customer].send($2) end
				when 'contractor'
				  if @data[:contractor] then @data[:contractor].send($2) end
				when 'my'
					if @data[:my] then @data[:my].parent.send($2) end
				when 'image'
					if $2 == 'logo'
						'<a href="http://www.nationwidehomewarranty.com"><img src="http://www.nationwidehomewarranty.com/images/email/logo.gif" alt="Nationwide Home Warranty"/></a>'
					end
				end
			rescue
				# Suppress Errors
			end
		end
  end
  
  def parsed_body
   return self.parse(self.body)
  end
  
  def EmailTemplate.placeholders
  	[
  		['image logo', 'Logo and Slogan with link to site'],
  		['customer first_name', 'John'],
  		['customer last_name', 'Smith'],
  		['customer name', 'John Smith'],
  		['customer contract_number', '#N1000321'],
  		['customer email', 'johnsmith@fake.com'],
  		['customer full_address', '123 Maple St., Springfield, VA, 12345'],
  		['customer address', '123 Maple St.'],
  		['customer city', 'Springfield'],
  		['customer state', 'VA'],
  		['customer zip_code', '12345'],
  		['customer package_name', 'Full System'],
  		['customer pay_amount', 'Amount Per Payment'],
  		['customer package_price', '399.99'],
  		['customer list_price', 'Pkg. Price + Cvg. Addons'],
  		['customer coverage_option_names', 'Pool/Spa, Septic System'],
  		['contractor name', 'Joe Schmoe'],
  		['contractor company', 'Joe Schmoe Contracting']
  	]
  end
end
