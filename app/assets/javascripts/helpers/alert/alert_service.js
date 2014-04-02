Helper.factory('chAlertSvc', [function() {

	var raise = function(message) {
		$(document).trigger('chRaiseAlert', [message]);
	};

	return {
		raise: raise
	}
}]);