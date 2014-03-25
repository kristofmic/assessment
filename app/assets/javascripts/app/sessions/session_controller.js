Template.controller('SessionCtrl', ['$scope', 'Session', function($scope, Session){
	
	$scope.authenticate = function(){
		Session.create({
			email: $scope.email, 
			password: $scope.password
		});
	};

}]);