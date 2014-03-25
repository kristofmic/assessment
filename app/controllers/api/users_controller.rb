class UsersController < ApiController
  def create
	  @user = User.new(params[:user])
	  if @user.save
	    sign_in @user
	    flash[:success] = "Congratulations! You're now a member"
	    redirect_to feeds_path
	  else
	    render 'new'
	  end
  end
end