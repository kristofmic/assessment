class SessionsController < ApplicationController
  before_filter :user_signed_in, except: :destroy

  def new
  end

  def create
    @user = User.find_by_email(params[:email].downcase)
    if @user && @user.authenticate(params[:password])
      sign_in @user, remember_me: params[:remember_me]
      redirect_to ng_main_path
    else
      render 'new'
    end
  end

  def destroy
    sign_out
    render 'new'
  end
end