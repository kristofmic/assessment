(function(global) {

  global.ch = global.ch || {};

  ch.assessmentManager = angular.module('AssessmentManager',
    [
      'ui.router',
      'ch-ajax',
      'ch-alerts',
      'ch-events',
      'ch-inputs',
      'ch-charts',
      'ch-loading',
      'ch-validation',
      'ch-navigation'
    ]
  );

  ch.assessmentManager.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/dashboard");

    $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: '/assets/app/users/profile.html',
        controller: 'UserCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'assets/app/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
          requirements: ['AssessmentSvc', '$q', function(assessment, $q) {
            return $q.all({
              policy: assessment.getRequirements('Policy'),
              procedure: assessment.getRequirements('Procedure'),
              implemented: assessment.getRequirements('Implemented'),
              measured: assessment.getRequirements('Measured'),
              managed: assessment.getRequirements('Managed')
            });
          }],
          attributes: ['AssessmentSvc', '$q', function(assessment, $q) {
            return $q.all({
              policy: assessment.getAttributes('Policy'),
              procedure: assessment.getAttributes('Procedure'),
              implemented: assessment.getAttributes('Implemented'),
              measured: assessment.getAttributes('Measured'),
              managed: assessment.getAttributes('Managed')
            });
          }]
        }
      })
      .state('assessment', {
        url: '/assessment',
        templateUrl: 'assets/app/assessments/assessment.html',
        controller: 'AssessmentCtrl',
        abstract: true
      })
      .state('assessment.policy', {
        url: '/policy',
        templateUrl: 'assets/app/assessments/assessment_questionnaire/assessment_questionnaire.html',
        controller: 'AssessmentQuestionnaireCtrl',
        data: {
          type: 'Policy',
          headings: {
            response: 'Documented',
            scope: 'Applies to Scope of Environment'
          }
        },
        resolve: {
          requirements: ['AssessmentSvc', function(assessment) {
            return assessment.getRequirements('Policy');
          }],
          attributes: ['AssessmentSvc', function(assessment) {
            return assessment.getAttributes('Policy');
          }]
        }
      })
      .state('assessment.procedure', {
        url: '/procedure',
        templateUrl: 'assets/app/assessments/assessment_questionnaire/assessment_questionnaire.html',
        controller: 'AssessmentQuestionnaireCtrl',
        data: {
          type: 'Procedure',
          headings: {
            response: 'Documented',
            scope: 'Applies to Scope of Environment'
          }
        },
        resolve: {
          requirements: ['AssessmentSvc', function(assessment) {
            return assessment.getRequirements('Procedure');
          }],
          attributes: ['AssessmentSvc', function(assessment) {
            return assessment.getAttributes('Procedure');
          }]
        }
      })
      .state('assessment.implemented', {
        url: '/implemented',
        templateUrl: 'assets/app/assessments/assessment_questionnaire/assessment_questionnaire.html',
        controller: 'AssessmentQuestionnaireCtrl',
        data: {
          type: 'Implemented',
          headings: {
            response: 'Implemented',
            scope: 'Applied to Scope of Environment'
          }
        },
        resolve: {
          requirements: ['AssessmentSvc', function(assessment) {
            return assessment.getRequirements('Implemented');
          }],
          attributes: ['AssessmentSvc', function(assessment) {
            return assessment.getAttributes('Implemented');
          }]
        }
      })
      .state('assessment.measured', {
        url: '/measured',
        templateUrl: 'assets/app/assessments/assessment_questionnaire/assessment_questionnaire.html',
        controller: 'AssessmentQuestionnaireCtrl',
        data: {
          type: 'Measured',
          headings: {
            response: 'Review',
            scope: 'Types of Reviews'
          }
        },
        resolve: {
          requirements: ['AssessmentSvc', function(assessment) {
            return assessment.getRequirements('Measured');
          }],
          attributes: ['AssessmentSvc', function(assessment) {
            return assessment.getAttributes('Measured');
          }]
        }
      })
      .state('assessment.managed', {
        url: '/managed',
        templateUrl: 'assets/app/assessments/assessment_questionnaire/assessment_questionnaire.html',
        controller: 'AssessmentQuestionnaireCtrl',
        data: {
          type: 'Managed',
          headings: {
            response: 'Corrective Actions',
            scope: 'Types of Corrective Actions'
          }
        },
        resolve: {
          requirements: ['AssessmentSvc', function(assessment) {
            return assessment.getRequirements('Managed');
          }],
          attributes: ['AssessmentSvc', function(assessment) {
            return assessment.getAttributes('Managed');
          }]
        }
      });
  }]);

}(window));