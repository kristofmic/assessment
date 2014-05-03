(function(global) {

  global.ch = global.ch || {};

  ch.template = angular.module('Template', ['ui.router', 'Helper']);

  ch.template.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state('main', {
        url: '/home',
        templateUrl: '/assets/app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: '/assets/app/users/profile.html',
        controller: 'UserCtrl'
      });
  }]);

}(window));