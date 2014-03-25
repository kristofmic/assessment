Template.controller('UserCtrl', ['$scope', 'User', function($scope, User){

	$scope.create = function(){
		User.create({
			email: $scope.email, 
			password: $scope.password, 
			password_confirmation: $scope.password_confirmation
		});
	};

}]);