class ApiController < ApplicationController
	respond_to :json
	before_filter :user_not_signed_in
end