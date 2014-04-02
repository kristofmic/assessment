module ApiHelper

	def api_success(output)
		response = {status: 'Success', message: output[:message], data: output[:data]}
    render json: response, status: 200
	end

	def api_error(output)
		output[:error] = output[:error][0] if output[:error].is_a? Array
		response = {status: 'Error', error: output[:error]}
    render json: response, status: 400 
	end
end