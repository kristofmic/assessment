(function(app){

  var
    dependencies;

  dependencies = [
    '$scope',
    'requirements',
    'attributes',
    'DashboardSvc',
    DashboardCtrl
  ];

  app.controller('DashboardCtrl', dependencies);

  function DashboardCtrl($scope, requirements, attributes, dashboard) {

    $scope.sections = dashboard.getSections(requirements);

  }

}(window.ch.assessmentManager));