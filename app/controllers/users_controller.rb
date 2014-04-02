class UsersController < ApplicationController
  before_filter :user_signed_in, only: :new

  # POST
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

  # GET
  def new
    @user = User.new
  end

  # GET
  def reset_password
  	@user = User.find_by_password_reset_token(params[:token])
    if @user.nil? || @user.password_reset_sent_dt < 2.hours.ago  
      flash[:message] = "Password reset link expired. Please try again if you do not remember your password."
      redirect_to login_path
    end
  end

  # PUT
  def update_password
    @user = User.find_by_password_reset_token(params[:token])
    if @user.nil? || @user.password_reset_sent_dt < 2.hours.ago  
      flash[:message] = "Password reset link expired. Please try again if you do not remember your password."
      redirect_to login_path
    elsif @user.update_attributes(params[:user])
      @user.clear_password_reset
      sign_in @user
      flash[:message] = "Password successfully changed."
      redirect_to ng_main_path
    else
    	flash[:message] = @user.errors.full_messages.first
      redirect_to 'reset_password'
    end
  end
end