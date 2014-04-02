Template.controller('SessionCtrl', ['$scope', 'Session', function($scope, Session){
	$scope.forgotPassword = function(email) {
		Session.forgotPassword(email);
	}
}]);