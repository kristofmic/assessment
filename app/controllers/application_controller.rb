class ApplicationController < ActionController::Base
  include ApplicationHelper
  include SessionsHelper
  include ApiHelper

  protect_from_forgery
  after_filter :set_csrf_cookie_for_ng

  def main
  	user_not_signed_in
	end
	
end
