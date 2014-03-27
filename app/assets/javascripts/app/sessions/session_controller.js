Template.controller('SessionCtrl', ['$scope', 'Session', function($scope, Session){
	$scope.isInvalid = function(model) {
		console.log(model);
	}
}]);