(function(app){

  app.directive('chAssessmentTable', [function(){

    var linker = function(scope, elem, attrs) {
        scope.responses = {};
        scope.scopes = {};
        scope.chSortOrder = ['Domain', 'Control'];
        scope.chFilter = [];
    };

    var control = ['$scope', 'chEventManager', 'AssessmentSvc', function($scope, events, assessment) {

        // $scope Functions
        $scope.saveAnswer = function(value, option, req) {
            assessment.saveFinding(req.fID, option.attId, option.attTypeId, !!value);
        };

        $scope.setSelected = function(value, req) {
            events.raise('requirementSelect', {value: value, req: req} );
        };

        // Helper Functions
        var saveToolbarAnswer = function(value, option, req) {
            if (option.answerType === 'scope' && angular.isArray(req[option.answerType])) {
                if (value) {
                    if (!_.contains(req[option.answerType], option)) {
                        req[option.answerType].push(option);
                        $scope.saveAnswer(value, option, req);
                    }
                }
                else if (_.contains(req[option.answerType], option)) {
                    _.remove(req[option.answerType], function(opt) { return opt.attId === option.attId; });
                    $scope.saveAnswer(value, option, req);
                }
            }
            else if (!angular.equals(req[option.answerType], option)) {
                req[option.answerType] = option;
                $scope.saveAnswer(value, option, req);
            }
        };

        // Event Handlers
        $scope.$on('toolbarSelect', function(e, args) {
            _.each($scope.chfRequirements, function(req) {
                req.select = args.value;
            });
        });

        $scope.$on('toolbarAnswer', function(e, args) {
            events.raise('loadingStart');
            _.each($scope.chfRequirements, function(req) {
                if (req.select) {
                    saveToolbarAnswer(args.value, args.option, req);
                }
            });
            events.raise('loadingComplete');
        });

        $scope.$on('toolbarClear', function(e) {
            events.raise('loadingStart');
            _.each($scope.chfRequirements, function(req) {
                if (req.select) {
                    if (!_.isEmpty(req.response)) {
                        $scope.saveAnswer(false, req.response, req);
                        req.response = {};
                    }

                    if (angular.isArray(req.scope)) {
                        _.each(req.scope, function(select) {
                            $scope.saveAnswer(false, select, req);
                        });
                        req.scope = [];
                    }
                    else if (!_.isEmpty(req.scope)) {
                        $scope.saveAnswer(false, req.scope, req);
                        req.scope = {};
                    }
                }
            });
            events.raise('loadingComplete');
        });

        $scope.$on('toolbarStarred', function(e, args) {
            _.each($scope.chfRequirements, function(req) {
              if (req.select) {
                req.starred = args.value;
              }
            });
        });

        $scope.$on('toolbarSetFilter', function(e, args) {
          $scope.chFilter.push(args.filter);
        });

        $scope.$on('toolbarRemoveFilter', function(e, args) {
          _.remove($scope.chFilter, args.filter);
        });

        $scope.$on('toolbarSetSort', function(e, args) {
          var replaceIndex = -1;
          if (args.column[0] === '-') {
            replaceIndex = _.findIndex($scope.chSortOrder, function(col) {
              return col === args.column.split('-')[1];
            });
          }
          else {
            replaceIndex = _.findIndex($scope.chSortOrder, function(col) {
              return col === ('-' + args.column);
            });
          }

          if (replaceIndex >= 0) {
            $scope.chSortOrder.splice(replaceIndex, 1, args.column);
          }
          else {
            $scope.chSortOrder.push(args.column);
          }
        });

        $scope.$on('toolbarRemoveSort', function(e, args) {
          if (args.index) {
            $scope.chSortOrder.splice(args.index, 1);
          }
          else {
            _.remove($scope.chSortOrder, function(sort) {
              return sort === args.column;
            });
          }
        });

    }];

    return {
      restrict: 'A',
      templateUrl: 'assets/app/assessments/assessment_table/assessment_table.html',
      replace: false,
      link: linker,
      controller: control,
      scope: {
        chAssessmentTable: '@',
        chRequirements: '=',
        chHeadings: '=',
        chScopeOptions: '=',
        chResponseOptions: '=',
        chSearch: '='
      }
    };
  }]);

}(window.ch.assessmentManager));