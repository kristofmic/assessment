Template.controller('SessionCtrl', ['$scope', 'Session', function($scope, Session){
	$scope.authenticate = function(){
		Session.auth({email: $scope.email, password: $scope.password});
	};
}]);