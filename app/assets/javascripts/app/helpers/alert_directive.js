Helper.directive('chAlert', ['chValidator', function(validator) {
  var linker = function(scope, element, attrs) {
    scope.self = element;
    if (validator.isValid(scope.alertMessage)) {

      if (angular.isArray(scope.alertMessage)) {
        scope.alertMessage = scope.alertMessage[0];
      }

      $($(element).children()[0]).show();

      window.setTimeout(function() { 
        scope.dismiss();
      }, 7000);
    } else {
      scope.dismiss();
    }
  };

  var ctrl = function($scope) {
    $scope.dismiss = function() {
      $($scope.self.children()[0]).remove();
      $scope.alertMessage = '';
    };
  }

	return {
		restrict: 'A C',
		templateUrl: '/assets/app/helpers/alert.html',
		link: linker,
    controller: ctrl,
    scope: {
      alertMessage: '@message'
    }
	};
}]);

