(function(global) {

  global.ch = global.ch || {};

  ch.assessmentManager = angular.module('AssessmentManager',
    [
      'ui.router',
      'ch-ajax',
      'ch-alerts',
      'ch-events',
      'ch-inputs',
      'ch-loading',
      'ch-validation'
    ]
  );

  ch.assessmentManager.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/profile");

    $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: '/assets/app/users/profile.html',
        controller: 'UserCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'assets/app/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
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
          nav: 0,
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
          nav: 1,
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
          nav: 2,
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
          nav: 3,
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
          nav: 4,
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