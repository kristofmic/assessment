class SessionsController < ApplicationController

  def create
    @user = User.find_by_email(params[:email].downcase)
    if(@user && @user.authenticate(params[:password]))
      sign_in @user
    end
  end

  def destroy
    sign_out
  end
end