(function(app) {

	app.factory('Session', ['chApi', 'chAlertSvc', function(chApi, chAlertSvc){

		return {
			forgotPassword: forgotPassword
		};

		function forgotPassword(email) {
			chApi.update('/forgot_password', {email: email})
				.then(function(result) {
					chAlertSvc.raise(result.message);
				}, function(reason) {
					chAlertSvc.raise(reason.error);
				});
		}


	}]);

}(window.ch.template));