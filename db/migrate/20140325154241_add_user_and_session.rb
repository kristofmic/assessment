class AddUserAndSession < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :cookie_token
      t.string :password_reset_token
      t.datetime :password_reset_sent_dt

      t.timestamps
    end

    add_index :users, :email, unique: true
    add_index :users, :cookie_token, unique: true
    add_index :users, :password_reset_token, unique: true
  end
end
