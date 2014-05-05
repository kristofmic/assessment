(function(global) {

  global.ch = global.ch || {};
  global.ch.events = angular.module('ch-events', []);

  global.ch.events.factory('chEventManager', ['$rootScope', function($rootScope){
    return {
      raise: raise
    };

    function raise(eventName, args) {
      $rootScope.$broadcast(eventName, args);
    }

  }]);

}(window));