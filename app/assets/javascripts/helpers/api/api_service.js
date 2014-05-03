(function(helper) {

	helper.factory('chApi', ['$http', '$q', function($http, $q) {
		return {
			fetch: fetch,
			create: create,
			update: update,
			destroy: destroy
		};

		function fetch(endpoint, params) {
			var deferred = $q.defer();

			$http.get(endpoint, {params: params})
				.success(deferred.resolve)
				.error(deferred.reject);

			return deferred.promise;
		}

		function create(endpoint, params) {
			var deferred = $q.defer();

			$http.post(endpoint, params)
				.success(deferred.resolve)
				.error(deferred.reject);

			return deferred.promise;
		}

		function update(endpoint, params) {
			var deferred = $q.defer();

			$http.put(endpoint, params)
				.success(deferred.resolve)
				.error(deferred.reject);

			return deferred.promise;
		}

		function destroy(endpoint, params) {
			var deferred = $q.defer();

			$http.delete(endpoint, {params: params})
				.success(deferred.resolve)
				.error(deferred.reject);

			return deferred.promise;
		}
	}]);

}(window.ch.helper));