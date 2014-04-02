Helper.factory('chApi', ['$http', '$q', function($http, $q) {

	var fetch = function(endpoint, params) {
		var deferred = $q.defer();

		$http.get(endpoint, {params: params})
			.success(deferred.resolve)
			.error(deferred.reject);

		return deferred.promise;
	}

	var create = function(endpoint, params) {
		var deferred = $q.defer();

		$http.post(endpoint, params)
			.success(deferred.resolve)
			.error(deferred.reject);
			
		return deferred.promise;
	}

	var update = function(endpoint, params) {
		var deferred = $q.defer();

		$http.put(endpoint, params)
			.success(deferred.resolve)
			.error(deferred.reject);
			
		return deferred.promise;
	}

	var destroy = function(endpoint, params) {
		var deferred = $q.defer();

		$http.delete(endpoint, {params: params})
			.success(deferred.resolve)
			.error(deferred.reject);
			
		return deferred.promise;
	}

	return {
		fetch: fetch,
		create: create,
		update: update,
		destroy: destroy
	}
}]);