(function(global) {

  global.ch = global.ch || {};
  global.ch.navigation = angular.module('ch-navigation', []);

  global.ch.navigation.directive('chNav', ['$location', function($location) {

    return {
      restrict: 'AC',
      link: linker,
      scope: {
        path: '@chNav'
      }
    };

    function linker(scope, element, attrs) {
      scope.$on('$stateChangeSuccess', setActiveNav);

      function setActiveNav() {
        if (_.contains($location.path(), scope.path)) {
          element.addClass('active');
        }
        else {
          element.removeClass('active');
        }
      }
    }

  }]);

}(window));