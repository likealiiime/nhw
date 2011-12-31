# Please install Capistrano and the Engine Yard Capistrano via rubygems
# gem install capistrano --version=2.4.3
# gem install engineyard-eycap --version=0.3.7 --source=http://gems.github.com

require "eycap/recipes"

# =================================================================================================
# ENGINE YARD REQUIRED VARIABLES
# =================================================================================================
# You must always specify the application and repository for every recipe. The repository must be
# the URL of the repository you want this recipe to correspond to. The :deploy_to variable must be
# the root of the application.

set :keep_releases,       5
set :application,         "nationwide"
set :user,                "nationwide"
set :password,            "Dy9MBogTEhfd"
set :deploy_to,           "/data/#{application}"
set :monit_group,         "nationwide"
set :runner,              "nationwide"
set :repository,          "https://nationwide.svn.beanstalkapp.com/nhw/trunk"
set :scm_username,        "development"
set :scm_password,        "00development99"
set :scm,                 :subversion
set :deploy_via,          :filtered_remote_cache
set :repository_cache,    "/var/cache/engineyard/#{application}"
set :production_database, "nationwide_production"
set :production_dbhost,   "mysql50-8-master"
set :dbuser,              "nationwide_db"
set :dbpass,              "q6kcBN8gxQzZ"

# comment out if it gives you trouble. newest net/ssh needs this set.
ssh_options[:paranoid] = false

# =================================================================================================
# ROLES
# =================================================================================================
# You can define any number of roles, each of which contains any number of machines. Roles might
# include such things as :web, or :app, or :db, defining what the purpose of each machine is. You
# can also specify options that can be used to single out a specific subset of boxes in a
# particular role, like :primary => true.

task :production do
  role :web, "65.74.186.4:8115" # nationwide [mongrel] [mysql50-8-master]
  role :app, "65.74.186.4:8115", :mongrel => true, :backgroundrb => true
  role :db , "65.74.186.4:8115", :primary => true
  
  set :rails_env, "production"
  set :environment_database, defer { production_database }
  set :environment_dbhost, defer { production_dbhost }
end 

# =================================================================================================
desc "Custom bash calls for trialspace"
task :symlink_faxes, :roles => :app, :except => {:no_release => true, :no_symlink => true} do
  run <<-CMD
    ln -nfs #{shared_path}/faxes #{latest_release}/faxes
  CMD
end

# =================================================================================================
namespace :deploy do
  task :symlink_views, :roles => :app, :except => {:no_symlink => true} do
    run "if [ -d #{latest_release}/app/views/site ]; then mv #{latest_release}/app/views/site #{latest_release}/appviews/site.bak; fi"
    run "ln -nfs #{shared_path}/app/views/site #{latest_release}/app/views/site"
  end 
end

# Do not change below unless you know what you are doing!
after "deploy", "deploy:cleanup"
after "deploy:migrations" , "deploy:cleanup"
after "deploy:update_code", "deploy:symlink_configs"
after "deploy:symlink_configs", "symlink_faxes"
#after "deploy:update_code", "deploy:symlink_views"
after "deploy:symlink", "bdrb:restart"

# uncomment the following to have a database backup done before every migration
# before "deploy:migrate", "db:dump"



