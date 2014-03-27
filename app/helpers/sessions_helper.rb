module SessionsHelper
  def sign_in user, options = {}
    if options[:remember_me]
      cookies.permanent[:cookie_token] = user.cookie_token
    else
      cookies[:cookie_token] = user.cookie_token
    end
  end

  def signed_in?
    !current_user.nil?
  end

  def sign_out
    current_user.sign_out
    cookies.delete :cookie_token
    set_current_user(nil)
  end

  def set_current_user(user)
    @current_user = user
  end

  def current_user
    @current_user = @current_user || current_user_from_db
  end

  def current_user_from_db
    User.find_by_cookie_token(cookies[:cookie_token])
  end

  def current_user? user
    current_user == user
  end

  def user_not_signed_in
    unless signed_in?
      redirect_to login_path
    end
  end

  def user_signed_in redirect_path=ng_main_path
    redirect_to redirect_path if signed_in?
  end

  def ng_main_path
    '/#/home'
  end

end