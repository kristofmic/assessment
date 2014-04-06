class Api::UsersController < ApiController 
  # PUT
  def change_password
    @user = current_user
    if @user.nil?
      api_error(error: "Please login to change your password.")
    elsif @user.authenticate(params[:current_password])
      if @user.update_attributes(password: params[:new_password], password_confirmation: params[:password_confirmation])
        sign_in @user
        api_success(message: "Password successfully changed.")
      else
        api_error(error: @user.errors.full_messages.first)
      end
    else
      api_error(error: "Incorrent password. Please try again.");
    end
  end
end