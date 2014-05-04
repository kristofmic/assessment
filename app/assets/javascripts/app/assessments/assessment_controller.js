(function(app){

  app.controller('AssessmentCtrl', ['$scope', 'chNav', function($scope, nav){
    $scope.navs = nav.get();

    $scope.setNav = function(index) {
      nav.set(index);
    };
  }]);

}(window.ch.assessmentManager));