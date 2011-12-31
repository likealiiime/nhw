class MigrateToJoinTable < ActiveRecord::Migration
  def self.up
    Fax.all.each do |fax|
      FaxAssignableJoin.create({
        :fax_id => fax.id,
        :assignable_id => fax.assignable_id,
        :assignable_type => fax.assignable_type
      }) if fax.assignable_id and fax.assignable_type
    end
    remove_column :faxes, :assignable_id
    remove_column :faxes, :assignable_type
  end

  def self.down
  end
end
