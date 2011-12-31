class SignatureHash < ActiveRecord::Base
  belongs_to :account
  attr_writer :signature
  
  def edit_url
    self.account.parent.edit_url
  end
  
  def notification_summary
    "E-Signature"
  end
  
  def SignatureHash.encrypt(s)
    public_key = OpenSSL::PKey::RSA.new(File.read("#{RAILS_ROOT}/app/security/public.pem"));
    return Base64.encode64(public_key.public_encrypt(s))
  end
  
  def signature
    private_key = OpenSSL::PKey::RSA.new(File.read('app/security/private.pem'), 'aENtkiJ0')
    yaml = private_key.private_decrypt(Base64.decode64(self.signature_hash))
    return YAML::load(yaml)
  end
  
  protected
  
  def before_save
    if not self.created_at.nil? and not self.updated_at.nil?
      logger.info("Could not accept signature: Signature already provided"); return false
    end
    
    if not @signature
      logger.info("Could not accept signature: No signature object provided"); return false
    end
    
    if not self.account_id
      logger.info("Could not accept signature: Account ID not provided"); return false
    end
    account = Account.find(self.account_id)
    if account.nil?
      logger.info("Could not accept signature: Account not found"); return false
    end
    
    if @signature[:email] != account.email
      logger.info("Could not accept signature: Email does not match"); return false
    end
    
    if not @signature[:password]
      logger.info("Could not accept signature: Password not provided"); return false
    end
    @signature[:password_hash] = Digest::SHA1.hexdigest(@signature[:password])
    if @signature[:password_hash] != account.password_hash
      logger.info("Could not accept signature: Password hashes do not match"); return false
    end
    
    @signature[:name].downcase!
    if @signature[:name] != account.parent.name.downcase
      logger.info("Could not accept signature: Name does not match"); return false
    end
    
    if @signature[:credit_card_number] != account.parent.credit_card_number
      logger.info("Could not accept signature: Credit Card Numbers do not match"); return false
    end
    
    if not @signature[:ssn] or @signature[:ssn].to_i == 0 or @signature[:ssn].length != 4
      logger.info("Could not accept signature: Invalid Last 4 of SSN"); return false
    end
    
    self.signature_hash = SignatureHash.encrypt(YAML::dump(@signature))
    
    return true
  end

end
