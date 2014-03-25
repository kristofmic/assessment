Template.factory('Session', ['$http', function($http){
	var authenticate = function(credentials){
		var email = credentials.email || '',
				password = credentials.password || '';
	}


	return {
		auth: authenticate
	}
}]);