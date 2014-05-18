class SessionsController < ApplicationController
  before_filter :user_signed_in, only: :new

  def new
  end

  def create
    @user = User.find_by_email(params[:email].downcase)
    if @user && @user.authenticate(params[:password])
      sign_in @user, remember_me: params[:remember_me]
      redirect_to ng_main_path
    else
      flash.now[:message] = "Incorrect email/password. Please try again."
      render 'new'
    end
  end

  def destroy
    sign_out
    flash[:message] = "Successfully signed out."
    redirect_to login_path
  end

  def forgot_password
    if params[:email].blank?
      api_error(error: "Please enter a valid email address")
    else
      @user = User.find_by_email(params[:email])
      if @user
        @user.generate_password_reset
        UsersMailer.forgot_password(@user).deliver
      end
      api_success(message: "An email has been sent to #{params[:email]} with instructions on resetting your password.")
    end
  end
end