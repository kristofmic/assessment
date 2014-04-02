class UsersMailer < ActionMailer::Base

	def forgot_password(user)
    @user = user
    mail(to: @user.email, subject: "Template: Forgot Password", from: "Template <do-not-reply@template.com>")
  end

end