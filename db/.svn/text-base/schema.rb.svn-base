# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20100221061814) do

  create_table "accounts", :force => true do |t|
    t.string   "email",                                       :null => false
    t.string   "password_hash",                               :null => false
    t.string   "role",          :limit => 20,                 :null => false
    t.integer  "parent_id",                                   :null => false
    t.string   "parent_type",   :limit => 20,                 :null => false
    t.integer  "timezone",                    :default => -5, :null => false
    t.datetime "created_at",                                  :null => false
    t.datetime "updated_at",                                  :null => false
    t.string   "last_login_ip"
    t.datetime "last_login_at"
  end

  add_index "accounts", ["email"], :name => "accounts_email_idx"
  add_index "accounts", ["parent_id"], :name => "accounts_par_id_idx"

  create_table "addresses", :force => true do |t|
    t.string   "address"
    t.string   "address2"
    t.string   "address3"
    t.string   "city",             :default => ""
    t.string   "state",            :default => ""
    t.string   "zip_code",         :default => ""
    t.string   "country",          :default => "United States of America"
    t.integer  "addressable_id"
    t.string   "addressable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "address_type",     :default => "Property"
    t.float    "lat"
    t.float    "lng"
    t.string   "verified_address"
    t.string   "geocoded_address"
  end

  add_index "addresses", ["address_type"], :name => "addresses_address_type_idx"
  add_index "addresses", ["addressable_id"], :name => "addresses_addressable_id_idx"
  add_index "addresses", ["addressable_type"], :name => "addresses_addressable_type_idx"
  add_index "addresses", ["zip_code"], :name => "addresses_zip_code_idx"

  create_table "agents", :force => true do |t|
    t.string  "name",                  :default => "", :null => false
    t.string  "email",                 :default => "", :null => false
    t.integer "admin",                 :default => 0,  :null => false
    t.integer "commission_percentage", :default => 8,  :null => false
  end

  add_index "agents", ["email"], :name => "agents_email_idx"
  add_index "agents", ["name"], :name => "agents_name_idx"

  create_table "bdrb_job_queues", :force => true do |t|
    t.binary   "args"
    t.string   "worker_name"
    t.string   "worker_method"
    t.string   "job_key"
    t.integer  "taken"
    t.integer  "finished"
    t.integer  "timeout"
    t.integer  "priority"
    t.datetime "submitted_at"
    t.datetime "started_at"
    t.datetime "finished_at"
    t.datetime "archived_at"
    t.string   "tag"
    t.string   "submitter_info"
    t.string   "runner_info"
    t.string   "worker_key"
    t.datetime "scheduled_at"
  end

  create_table "cancellation_reasons", :force => true do |t|
    t.string   "reason",     :default => ""
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "claims", :force => true do |t|
    t.integer  "customer_id"
    t.string   "claim_timestamp"
    t.text     "claim_text"
    t.string   "standard_coverage"
    t.datetime "created_at",                       :null => false
    t.datetime "updated_at",                       :null => false
    t.integer  "address_id"
    t.string   "agent_name"
    t.integer  "status_code",       :default => 0
  end

  add_index "claims", ["claim_timestamp"], :name => "claims_tstamp_idx"
  add_index "claims", ["customer_id"], :name => "claims_cust_id_idx"

  create_table "content", :force => true do |t|
    t.string   "slug",       :null => false
    t.text     "html",       :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "content", ["slug"], :name => "content_slug_index"

  create_table "contractor_payments", :force => true do |t|
    t.integer  "contractor_id"
    t.float    "amount"
    t.integer  "repair_id"
    t.datetime "paid_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "contractors", :force => true do |t|
    t.string   "first_name",         :default => "",      :null => false
    t.string   "last_name",          :default => "",      :null => false
    t.string   "company",                                 :null => false
    t.string   "job_title",          :default => "",      :null => false
    t.string   "phone",              :default => "",      :null => false
    t.string   "mobile",             :default => "",      :null => false
    t.string   "fax",                :default => "",      :null => false
    t.string   "email",              :default => "",      :null => false
    t.string   "priority",           :default => "",      :null => false
    t.string   "notes",              :default => ""
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "receive_invoice_as", :default => "email"
    t.integer  "rating",             :default => 0
    t.boolean  "flagged",            :default => false
    t.string   "url"
  end

  create_table "coverages", :force => true do |t|
    t.string  "coverage_name"
    t.integer "optional",      :default => 0
    t.integer "premier",       :default => 0
    t.float   "price",         :default => 0.0
    t.integer "pack_1",        :default => 0
    t.integer "pack_2",        :default => 0
    t.integer "pack_3",        :default => 0
    t.integer "pack_4",        :default => 0
    t.integer "sort_order",    :default => 0,   :null => false
  end

  create_table "credit_cards", :force => true do |t|
    t.string   "crypted_number"
    t.string   "last_4"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "phone"
    t.integer  "customer_id"
    t.integer  "month"
    t.integer  "year"
    t.integer  "address_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "customers", :force => true do |t|
    t.string   "email"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "customer_address"
    t.string   "customer_city"
    t.string   "customer_state"
    t.string   "customer_zip"
    t.string   "customer_phone"
    t.integer  "coverage_type",                            :default => 1
    t.string   "coverage_addon"
    t.string   "home_type",                 :limit => 20
    t.string   "pay_amount"
    t.integer  "num_payments",                             :default => 0
    t.integer  "disabled",                                 :default => 1
    t.integer  "coverage_end"
    t.datetime "coverage_ends_at"
    t.string   "subscription_id"
    t.integer  "validated",                                :default => 0
    t.string   "customer_comment",          :limit => 512
    t.string   "credit_card_number_hash",   :limit => 500
    t.string   "expirationDate"
    t.integer  "status_id",                                :default => 0, :null => false
    t.integer  "timestamp"
    t.string   "ip"
    t.string   "billing_first_name"
    t.string   "billing_last_name"
    t.string   "billing_address"
    t.string   "billing_city"
    t.string   "billing_state"
    t.string   "billing_zip"
    t.integer  "agent_id"
    t.datetime "created_at",                                              :null => false
    t.datetime "updated_at",                                              :null => false
    t.integer  "discount_id"
    t.integer  "cancellation_reason_id"
    t.integer  "icontact_id"
    t.string   "from"
    t.string   "service_fee_text_override"
    t.float    "service_fee_amt_override"
    t.string   "wait_period_text_override"
    t.integer  "wait_period_days_override"
    t.integer  "num_payments_override"
  end

  add_index "customers", ["agent_id"], :name => "customers_agent_id_idx"
  add_index "customers", ["customer_city"], :name => "customers_city_idx"
  add_index "customers", ["customer_state"], :name => "customers_state_idx"
  add_index "customers", ["customer_zip"], :name => "customers_zip_idx"
  add_index "customers", ["email"], :name => "customers_email_idx"
  add_index "customers", ["last_name"], :name => "customers_last_name_idx"
  add_index "customers", ["status_id"], :name => "customers_status_id_idx"

  create_table "discounts", :force => true do |t|
    t.boolean  "is_monthly"
    t.datetime "starts_at"
    t.datetime "ends_at"
    t.float    "value"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "email_templates", :force => true do |t|
    t.string  "name",    :default => "",    :null => false
    t.text    "subject",                    :null => false
    t.text    "body",                       :null => false
    t.boolean "locked",  :default => false
  end

  create_table "fax_assignable_joins", :force => true do |t|
    t.integer  "fax_id"
    t.integer  "assignable_id"
    t.string   "assignable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "fax_sources", :force => true do |t|
    t.string   "name"
    t.string   "address"
    t.string   "number"
    t.string   "key"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "password_hash"
  end

  create_table "faxes", :force => true do |t|
    t.string   "path"
    t.datetime "received_at"
    t.string   "sender_fax_number"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "source_id"
    t.integer  "message_id"
    t.boolean  "unassigned",        :default => true
  end

  add_index "faxes", ["source_id"], :name => "index_faxes_on_source_id"
  add_index "faxes", ["unassigned"], :name => "index_faxes_on_unassigned"

  create_table "i_contact_requests", :force => true do |t|
    t.string   "path",                      :null => false
    t.string   "put",        :limit => 512
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "notes", :force => true do |t|
    t.integer  "customer_id", :default => 0, :null => false
    t.text     "note_text",                  :null => false
    t.integer  "timestamp",   :default => 0, :null => false
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
    t.integer  "repair_id"
    t.integer  "author_id"
    t.string   "agent_name"
  end

  add_index "notes", ["customer_id"], :name => "notes_cust_id_idx"

  create_table "notifications", :force => true do |t|
    t.string   "message"
    t.string   "notification_type"
    t.integer  "level",             :default => 0
    t.integer  "subject_id"
    t.string   "subject_type"
    t.string   "subject_summary"
    t.integer  "actor_id"
    t.string   "actor_type"
    t.string   "actor_summary"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "packages", :force => true do |t|
    t.string "package_name"
    t.float  "single_price",                  :default => 0.0
    t.float  "condo_price",                   :default => 0.0
    t.float  "duplex_price",                                   :null => false
    t.float  "triplex_price",                                  :null => false
    t.float  "fourplex_price",                                 :null => false
    t.string "covers",         :limit => 600, :default => ""
  end

  create_table "properties", :force => true do |t|
    t.integer  "customer_id"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "properties", ["city"], :name => "properties_city_idx"
  add_index "properties", ["customer_id"], :name => "properties_cust_id_idx"
  add_index "properties", ["state"], :name => "properties_state_idx"
  add_index "properties", ["zip"], :name => "properties_zip_idx"

  create_table "referals", :primary_key => "referal_id", :force => true do |t|
    t.string  "referal_text", :default => "", :null => false
    t.integer "timestamp",    :default => 0,  :null => false
  end

  create_table "renewals", :force => true do |t|
    t.date     "starts_at"
    t.date     "ends_at"
    t.float    "amount"
    t.integer  "customer_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "years",       :default => 0
  end

  create_table "repairs", :force => true do |t|
    t.integer  "claim_id"
    t.integer  "contractor_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "authorization",  :default => 0,    :null => false
    t.float    "amount",         :default => 0.0,  :null => false
    t.integer  "status",         :default => 0
    t.float    "service_charge", :default => 60.0
  end

  create_table "signature_hashes", :force => true do |t|
    t.text     "signature_hash"
    t.integer  "account_id",     :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "transactions", :force => true do |t|
    t.integer  "response_code"
    t.string   "response_reason_text"
    t.string   "auth_code"
    t.float    "amount"
    t.integer  "transaction_id"
    t.integer  "customer_id"
    t.integer  "subscription_id"
    t.integer  "subscription_paynum"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "original_agent_id"
  end

  add_index "transactions", ["customer_id"], :name => "transactions_cust_id_idx"
  add_index "transactions", ["original_agent_id"], :name => "transactions_orig_agent_id_idx"
  add_index "transactions", ["subscription_id"], :name => "transactions_subs_id_idx"
  add_index "transactions", ["transaction_id"], :name => "transactions_trans_id_idx"

end
