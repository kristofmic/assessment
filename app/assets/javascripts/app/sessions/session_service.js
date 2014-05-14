(function(app) {

	app.factory('Session', ['chAjax', 'chAlertSvc', function(ajax, chAlertSvc){

		return {
			forgotPassword: forgotPassword
		};

		function forgotPassword(email) {
			ajax.update('/forgot_password', {email: email})
				.then(function(result) {
					chAlertSvc.raise(result.message);
				}, function(reason) {
					chAlertSvc.raise(reason.error);
				});
		}


	}]);

}(window.ch.assessmentManager));