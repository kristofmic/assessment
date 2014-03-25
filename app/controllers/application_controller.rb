class ApplicationController < ActionController::Base
  include ApplicationHelper
  include SessionsHelper

  protect_from_forgery
  after_filter :set_csrf_cookie_for_ng

  def main
	end
	
end
