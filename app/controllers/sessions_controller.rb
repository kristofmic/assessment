class SessionsController < ApplicationController

  def new

  end

  def create
    binding.pry
    @user = User.find_by_email(params[:email].downcase)
    if @user && @user.authenticate(params[:password])
      sign_in @user
      redirect_to '/#/main'
    else
      render 'new'
    end
  end

  def destroy
    sign_out
    render 'new'
  end
end