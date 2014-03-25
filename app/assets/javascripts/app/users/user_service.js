Template.factory('User', ['$http', 'Alert', function($http, alert){
	
	var create = function(credentials, successCallBack){
		$http.post('/api/users/create', {user: credentials})
			.success(function(data, status, headers, config){
	      alert.success(data.message);
	      if (successCallBack) {
	      	successCallBack(data.data);
	      }
	    })
	    .error(function(data, status, headers, config){
	      alert.error(data.errors);
	    });
	};

	return {
		create: create
	};	
}]);