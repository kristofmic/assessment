Helper.directive('chAlert', ['$compile', '$templateCache', 'chValidator', function($compile, $templateCache, validator) {
  var templateUrl = '/assets/helpers/alert/alert.html';

  var create = function(scope) {
    if (validator.isValid(scope.alertMessage)) {

      if (angular.isArray(scope.alertMessage)) {
        scope.alertMessage = scope.alertMessage[0];
      }

      $(scope.self.children()[0]).show();

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

    $(document).on('chRaiseAlert', function(e, message) {
      scope.alertMessage = message;
      element.html($templateCache.get(templateUrl)[1]);
      $compile(element.contents())(scope);
      create(scope);
    });
  };

  var ctrl = function($scope) {
    
    $scope.dismiss = function() {
      _.each($scope.self.children(), function(child) {
        $(child).remove();
      });
      $scope.alertMessage = null;
    };
  }

	return {
		restrict: 'A C',
		templateUrl: templateUrl,
		link: linker,
    controller: ctrl,
    scope: {
      alertMessage: '@message'
    }
	};
}]);

