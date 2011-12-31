require 'net/http'
require 'uri'

file = File.read('transactions.txt')
file.scan(/At\:.+?2008\n((.+?\n)+)/) do |match|
  match = match[0]
  params = {}
  match.split("\n").each do |line|
    line = line.strip.split(' = ')
    params.merge!({ line[0] => line[1] || ''})
  end
	response = Net::HTTP.post_form(URI.parse('http://www.nationwidehomewarranty.com/admin/transactions/authorize_silent_post'), params)
	puts response.body
end