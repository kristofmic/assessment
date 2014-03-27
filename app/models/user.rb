# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string(255)
#  password_digest :string(255)
#  cookie_token    :string(255)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  attr_accessible :email, :password, :password_confirmation

  has_secure_password

  validates :email, presence: true, uniqueness: {case_sensitive: false}, format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/, on: :create}
  validates :password, presence: true, length: {minimum: 6}
  validates :password_confirmation, presence: true

  after_validation { self.errors.messages.delete(:password_digest) }

  before_save do 
    generate_token(:cookie_token) 
    self.email.downcase!
  end

  def sign_out
    self.save(validate: false)
  end

  private 
    def generate_token(column)  
      begin  
        self[column] = SecureRandom.urlsafe_base64  
      end while User.exists?(column => self[column])  
    end 
end
