Template.factory('Session', ['$http', function($http){
	
	var forgotPassword = function(email) {
		$http.post('/forgot_password', {email: email})
			.success(function(data, status, headers, config){
      	alert(data.message);
    	})
    	.error(function(data, status, headers, config){
      	alert('There was an error');
    	});
	}

	return {
		forgotPassword: forgotPassword
	}
}]);