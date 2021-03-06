(function(alerts) {

  alerts.directive('chAlert', ['$compile', '$templateCache', function($compile, $templateCache) {
    var templateUrl = '/assets/alerts/alert.html',
        control = ['$scope', controllerFunc];

    return {
      restrict: 'AC',
      templateUrl: templateUrl,
      link: linker,
      controller: control,
      scope: {
        alertMessage: '@message'
      }
    };

    function create(scope) {
      if (scope.alertMessage) {
        if (angular.isArray(scope.alertMessage)) {
          scope.alertMessage = scope.alertMessage[0];
        }

        $(scope.el.children()[0]).show();

        window.setTimeout(function() {
          scope.dismiss();
        }, 6000);
      }
      else {
        scope.dismiss();
      }
    }

    function linker(scope, element, attrs) {
      scope.el = element;
      create(scope);

      $(document).on('chRaiseAlert', function(e, message) {
        scope.alertMessage = message;
        element.html($templateCache.get(templateUrl)[1]);
        $compile(element.contents())(scope);
        create(scope);
      });
    }

    function controllerFunc($scope) {
      $scope.dismiss = function() {
        _.each($scope.el.children(), function(child) {
          $(child).remove();
        });
        $scope.alertMessage = null;
      };
    }

  }]);

}(window.ch.alerts));

