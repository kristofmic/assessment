var Template = angular.module('Template', ['ui.router', 'Helper']);

Template.config(['$stateProvider', '$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/login");

    $stateProvider
			.state('login', {
        url: '/login',
				templateUrl: '/assets/app/sessions/login.html',
				controller: 'SessionCtrl'
			})
      .state('signup', {
        url: '/signup',
        templateUrl: '/assets/app/users/signup.html',
        controller: 'UserCtrl'
      });
}]);