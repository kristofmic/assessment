class Api::SessionsController < ApiController

  def create
    email = params[:email] || ""
    binding.pry
    @user = User.find_by_email(email.downcase)
    if @user && @user.authenticate(params[:password])
      sign_in @user
      api_success message: "Welcome #{@user.email}"
    else
      api_error errors: "Invalid email/password combination"
    end
  end

  def destroy
    sign_out
  end
end