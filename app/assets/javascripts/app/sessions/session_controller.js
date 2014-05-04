(function(app) {

  app.controller('SessionCtrl', ['$scope', 'Session', function($scope, Session){
  	$scope.forgotPassword = function(email) {
  		Session.forgotPassword(email);
  	}
  }]);

}(window.ch.assessmentManager));
