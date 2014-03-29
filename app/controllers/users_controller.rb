class UsersController < ApplicationController
  before_filter :user_signed_in

  def create
	  @user = User.new(params[:user])
	  if @user.save
	    sign_in @user, remember_me: params[:remember_me]
	    redirect_to ng_main_path
	  else
      flash.now[:message] = @user.errors.full_messages.first
	  	render 'new'
	  end
  end

  def new
    @user = User.new
  end
end