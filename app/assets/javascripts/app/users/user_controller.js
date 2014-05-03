(function(app) {

  app.controller('UserCtrl', ['$scope', 'User', function($scope, User){
    $scope.changePassword = function(){
      User.changePassword({
        current_password: $scope.currentPassword,
        new_password: $scope.newPassword,
        password_confirmation: $scope.passwordConfirmation
      });
      $scope.currentPassword = '';
      $scope.newPassword = '';
      $scope.passwordConfirmation = '';
    };
  }]);

}(window.ch.template));