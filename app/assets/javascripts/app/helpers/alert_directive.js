Helper.directive('chAlert', ['$compile', '$templateCache', 'chValidator', function($compile, $templateCache, validator) {
  var create = function(scope) {
    if (validator.isValid(scope.alertMessage)) {

      if (angular.isArray(scope.alertMessage)) {
        scope.alertMessage = scope.alertMessage[0];
      }

      $($(self).children()[0]).show();

      window.setTimeout(function() { 
        scope.dismiss();
      }, 6000);
    } else {
      scope.dismiss();
    }
  };

  var linker = function(scope, element, attrs) {
    scope.self = element;
    create(scope);
  };

  var ctrlr = function($scope) {
    $(document).on('chRaiseAlert', function(e, message) {
      $scope.alertMessage = message;
      $scope.self.html($templateCache.get('/assets/app/helpers/alert.html')[1]);
      $compile($scope.self.contents())($scope);
      create($scope);
    });

    $scope.dismiss = function() {
      _.each($scope.self.children(), function(child) {
        $(child).remove();
      });
      $scope.alertMessage = null;
    };
  }

	return {
		restrict: 'A C',
		templateUrl: '/assets/app/helpers/alert.html',
		link: linker,
    controller: ctrlr,
    scope: {
      alertMessage: '@message'
    }
	};
}]);

