class Api::UsersController < ApiController
  def create
	  @user = User.new(params[:user])
	  if @user.save
	    sign_in @user
	    api_success message: "Congratulations! You're now a member"
	  else
	  	api_error errors: @user.errors.full_messages
	  end
  end
end