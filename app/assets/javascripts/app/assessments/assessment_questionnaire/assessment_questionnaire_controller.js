(function(app){

  app.controller('AssessmentQuestionnaireCtrl',
    ['$scope', '$state', 'requirements', 'attributes', 'chEventManager', 'AssessmentSvc',
    function($scope, $state, requirements, attributes, events, assessment){

      $scope.type = $state.current.data.type;

      $scope.requirements = _.each(requirements, function(req) {
        req.select = false;
      });

      $scope.headings = $state.current.data.headings;

      $scope.scopeOptions = _.filter(attributes, function(attr) { return attr.answerType === 'scope'; });
      $scope.responseOptions = _.filter(attributes, function(attr) { return attr.answerType === 'response'; });

      $scope.setNav($state.current.data.nav);
      events.raise('resetToolbar');

    }
  ]);

}(window.ch.assessmentManager));