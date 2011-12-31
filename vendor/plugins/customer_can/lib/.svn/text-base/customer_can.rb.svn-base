# Permission is hereby granted, free of charge, to any person obtaining
# a copy of this software and associated documentation files (the
# "Software"), to deal in the Software without restriction, including
# without limitation the rights to use, copy, modify, merge, publish,
# distribute, sublicense, and/or sell copies of the Software, and to
# permit persons to whom the Software is furnished to do so, subject to
# the following conditions:
#
# The above copyright notice and this permission notice shall be
# included in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
# EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
# MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
# LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
# OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
# WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
module CustomerCan
  def self.included(controller)
    controller.extend(ClassMethods)
    controller.before_filter(:ensure_customer_can)
    controller.before_filter(:ensure_contractor_can)
  end

  module ClassMethods
    def customer_can(*actions)
      write_inheritable_attribute(:customer_can_actions, actions)
    end
    
    def contractor_can(*actions)
      write_inheritable_attribute(:contractor_can_actions, actions)
    end
  end
  
  private
    def ensure_customer_can
      unless current_account.customer? then return true end
      
      allowed = (self.class.read_inheritable_attribute(:customer_can_actions) || []).include?(request.symbolized_path_parameters[:action].to_sym)
      if allowed
        return true
      else
        redirect_to "/admin/customers/claims"
      end
    end
    
    def ensure_contractor_can
      unless current_account.contractor? then return true end
      
      allowed = (self.class.read_inheritable_attribute(:contractor_can_actions) || []).include?(request.symbolized_path_parameters[:action].to_sym)
      return true if allowed
      redirect_to "/admin/repairs"
    end
    
end