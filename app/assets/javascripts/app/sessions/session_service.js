Template.factory('Session', ['chApi', 'chAlertSvc', function(chApi, chAlertSvc){
	
	var forgotPassword = function(email) {
		chApi.update('/forgot_password', {email: email})
			.then(function(result) {
				chAlertSvc.raise(result.message);
			}, function(reason) {
				chAlertSvc.raise(reason.error);
			});
	}

	return {
		forgotPassword: forgotPassword
	}
}]);