Template.controller('UserCtrl', ['$scope', 'User', function($scope, User){
  window.getScope = function() {
    return $scope;
  };
}]);