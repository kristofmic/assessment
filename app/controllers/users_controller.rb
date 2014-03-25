class UsersController < ApplicationController
  def create
	  @user = User.new(params[:user])
	  if @user.save
	    sign_in @user
	    redirect_to '/#/main'
	  else
	  	render 'new'
	  end
  end

  def new
    @user = User.new
  end
end