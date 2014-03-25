module ApiHelper

	def api_success(output)
		response = {status: 'Success', message: output[:message], data: output[:data]}
    render json: response, status: 200
	end

	def api_error(output)
		output[:errors] = [output[:errors]] unless output[:errors].is_a? Array
		response = {status: 'Error', errors: output[:errors]}
    render json: response, status: 400 
	end
end