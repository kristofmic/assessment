Template.factory('Session', ['$http', 'chAlertSvc', function($http, chAlertSvc){
	
	var forgotPassword = function(email) {
		$http.post('/forgot_password', {email: email})
			.success(function(data, status, headers, config){
      	chAlertSvc.raise(data.message);
    	})
    	.error(function(data, status, headers, config){
      	chAlertSvc.raise(data.error);
    	});
	}

	return {
		forgotPassword: forgotPassword
	}
}]);