(function(app){

  app.directive('chToolbar', [function() {

    var control = ['$scope', '$filter', 'chEventManager', function($scope, $filter, events) {
      // Data Setup
      $scope.toolbarOption = '';
      // --Select
      $scope.selectPartial = false;
      $scope.activeRequirements = 0;
      $scope.answers = {
        response: {}
      };
      var originalScope;
      if ($scope.type === "Measured" || $scope.type === "Managed") {
        originalScope = [];
      } else {
        originalScope = {};
      }
      $scope.answers.scope = _.clone(originalScope);

      // --Filter
      $scope.filterOptions = [
        {
          label: 'Selected',
          options: [
            { label: 'Selected', icon: 'glyphicon-check', value: 1, filter: {key: 'select', value: true} },
            { label: 'Unselected', icon: 'glyphicon-unchecked', value: 0, filter: {key: 'select', value: false} }
          ],
          active: {}
        },
        {
          label: 'Starred',
          options: [
            { label: 'Starred', icon: 'glyphicon-star', value: 1, filter: {key: 'starred', value: true} },
            { label: 'Unstarred', icon: 'glyphicon-star-empty', value: 0, filter: {key: 'starred', value: false} }
          ],
          active: {}
        },
        {
          label: 'Domain',
          options: getUniqReqCol('Domain'),
          active: {}
        },
        {
          label: 'Control',
          options: getUniqReqCol('Control'),
          active: {}
        },
        {
          label: $scope.responseHeading,
          options: getAnswerFilterOptions($scope.responseOptions, 'response'),
          active: {}
        },
        {
          label: $scope.scopeHeading,
          options: getAnswerFilterOptions($scope.scopeOptions, 'scope'),
          active: {}
        }
      ];
      $scope.activeFilters = [];

      // --Sorting
      $scope.sortOptions = [
        {
          label: 'Selected',
          options: {
            asc: { label: 'Select', icon: 'glyphicon-sort-by-attributes', value: 0, sort: 'select' },
            desc: { label: 'Select', icon: 'glyphicon-sort-by-attributes-alt', value: 1, sort: '-select' }
          },
          active: {}
        },
        {
          label: 'Starred',
          options: {
            asc: { label: 'Starred', icon: 'glyphicon-sort-by-attributes', value: 0, sort: 'starred' },
            desc: { label: 'Starred', icon: 'glyphicon-sort-by-attributes-alt', value: 1, sort: '-starred' }
          },
          active: {}
        },
        {
          label: 'Domain',
          options: {
            asc: { label: 'Domain', icon: 'glyphicon-sort-by-attributes', value: 0, sort: 'Domain' },
            desc: { label: 'Domain', icon: 'glyphicon-sort-by-attributes-alt', value: 1, sort: '-Domain' }
          },
          active: {}
        },
        {
          label: 'Control',
          options: {
            asc: { label: 'Control', icon: 'glyphicon-sort-by-attributes', value: 0, sort: 'Control' },
            desc: { label: 'Control', icon: 'glyphicon-sort-by-attributes-alt', value: 1, sort: '-Control' }
          },
          active: {}
        },
        {
          label: $scope.responseHeading,
          options: {
            asc: { label: $scope.responseHeading + '', icon: 'glyphicon-sort-by-attributes-alt', value: 0, sort: 'response.attId' },
            desc: { label: $scope.responseHeading + '', icon: 'glyphicon-sort-by-attributes', value: 1, sort: '-response.attId' }
          },
          active: {}
        },
        {
          label: $scope.scopeHeading,
          options: {
            asc: { label: $scope.scopeHeading + '', icon: 'glyphicon-sort-by-attributes-alt', value: 0, sort: ('scope.' + getScopeSort($scope.type)) },
            desc: { label: $scope.scopeHeading + '', icon: 'glyphicon-sort-by-attributes', value: 1, sort: '-scope.' + getScopeSort($scope.type) }
          },
          active: {}
        }
      ];
      $scope.activeSorts = [$scope.sortOptions[2], $scope.sortOptions[3]];
      $scope.sortOptions[2].active = $scope.sortOptions[2].options.asc;
      $scope.sortOptions[3].active = $scope.sortOptions[3].options.asc;

      // $scope Functions
      $scope.setToolbarOption = function($event, option) {
        if ($event.target === $event.currentTarget) {
          if ($scope.toolbarOption === option) {
            $scope.toolbarOption = '';
          }
          else {
            $scope.toolbarOption = option;
          }
        }
      };

      // --Select
      $scope.selected = function(value) {
        if (!value) {
          $scope.activeRequirements = 0;
          $scope.toolbarOption = '';
          reset();
        } else {
          $scope.toolbarOption = 'select';
          $scope.activeRequirements = applyFilter($scope.requirements).length;
        }
        $scope.selectPartial = false;
        events.raise('toolbarSelect', { value: value });
      };

      $scope.starred = function(value) {
        events.raise('toolbarStarred', { value: value });
      };

      $scope.setAnswers = function(value, option) {
        events.raise('toolbarAnswer', { option: option, value: !!value });
      };

      $scope.clearAnswers = function() {
        events.raise('toolbarClear');
        $scope.resetAnswers();
      };

      $scope.resetAnswers = function() {
        $scope.answers.response = {};
        $scope.answers.scope = _.clone(originalScope);
        _.each($scope.scopeOptions, function(opt){
          opt.partial = false;
        });
      };

      // --Filter
      $scope.addFilter = function(filter, index) {
        if (!_.contains($scope.activeFilters, filter)) {
          $scope.toolbarOption = 'filter';
          $scope.activeFilters.push(filter);
        }
      };

      $scope.removeFilter = function(filter, index) {
        removeAllFilterOptions(filter.options);
        $scope.activeFilters.splice(index, 1);

        if ($scope.activeFilters.length === 0) {
          $scope.toolbarOption = '';
        }

        if (angular.isArray(filter.active)) {
          filter.active = [];
        } else {
          filter.active = {};
        }
      };

      $scope.setFilter = function(value, option, filter) {
        if (angular.isArray(filter.active)) {
          if (value) {
            events.raise('toolbarSetFilter', { filter: option.filter });
          }
          else {
            events.raise('toolbarRemoveFilter', { filter: option.filter });
          }
        }
        else {
          removeAllFilterOptions(filter.options);
          events.raise('toolbarSetFilter', { filter: option.filter });
        }
      };

      $scope.clearFilters = function() {
        while ($scope.activeFilters.length > 0) {
          $scope.removeFilter($scope.activeFilters[0]);
        }
        $scope.toolbarOption = '';
      };

      // --Sort
      $scope.addSort = function(sort, index) {
        if (!_.contains($scope.activeSorts, sort)) {
          $scope.toolbarOption = 'sorts';
          $scope.activeSorts.push(sort);
        }
      };

      $scope.setSort = function(value, option, sort) {
        //removeAllSortOptions(sort.options);
        events.raise('toolbarSetSort', { column: option.sort });
      };

      $scope.removeSort = function(sort, index) {
        removeAllSortOptions(sort.options);
        $scope.activeSorts.splice(index, 1);

        if ($scope.activeSorts.length === 0) {
          $scope.toolbarOption = '';
        }

        sort.active = {};
      };

      $scope.clearSorts = function() {
        while ($scope.activeSorts.length > 0) {
          $scope.removeSort($scope.activeSorts[0]);
        }
        $scope.toolbarOption = '';
      };

      // Helper Functions
      function reset() {
        $scope.toolbarOption = '';
        $scope.activeRequirements = 0;
        $scope.selectPartial = false;
        $scope.resetAnswers();
        $scope.clearFilters();
      }

      function applyFilter(reqs) {
        var filters = _.mapValues($scope.activeFilters, function(val) {
          return val.filter;
        });

        var results = $filter('filter')(reqs, $scope.search);
        results = $filter('chToolbarFilters')(results, filters);
        return results;
      }

      function removeAllFilterOptions(options) {
        _.each(options, function(opt) {
          events.raise('toolbarRemoveFilter', { filter: opt.filter });
        });
      }

      function activeFilterType(type) {
        var active;
        if ($scope.type === "Measured" || $scope.type === "Managed") {
          active = [];
        } else {
          active = {};
        }
        return active;
      }

      function getAnswerFilterOptions(options, type) {
        options = _.map(options, function(opt) {
          return {
            label: opt.attDesc,
            value: opt.attId,
            filter: {key: type, value: opt}
          };
        });

        options.push({
          label: 'Unanswered',
          value: -1,
          filter: {key: type, value: activeFilterType()}
        });

        return options;
      }

      function getUniqReqCol(column) {
        var reqs = _.uniq($scope.requirements, column);
        reqs = _.map(reqs, function(req) {
          return {
            label: req[column],
            value: req[column].split(' ')[0],
            filter: {key: column, value: req[column]}
          };
        });
        reqs = _.sortBy(reqs, 'label');
        return reqs;
      }

      function removeAllSortOptions(options) {
        _.each(options, function(opt) {
          events.raise('toolbarRemoveSort', { column: opt.sort });
        });
      }

      function getScopeSort(type) {
        if (type === 'Measured' || type === 'Managed') {
          return 'length';
        }
        else {
          return 'attId';
        }
      }

      // Event Handlers
      $scope.$on('resetToolbar', function(e) {
        reset();
      });

      $scope.$on('requirementSelect', function(e, args) {
        if (args.value) {
          $scope.toolbarOption = 'select';
          $scope.selectPartial = true;
          $scope.activeRequirements += 1;
          if ($scope.activeRequirements === applyFilter($scope.requirements).length) {
            $scope.selectPartial = false;
          }
        } else {
          $scope.activeRequirements -= 1;
          if ($scope.activeRequirements !== applyFilter($scope.requirements).length) {
            $scope.selectPartial = true;
          }
          if ($scope.activeRequirements === 0) {
            $scope.toolbarOption = '';
            $scope.selectPartial = false;
            $scope.resetAnswers();
          }
        }
      });

    }];

    // DDO
    return {
      restrict: 'A',
      replace: false,
      templateUrl: 'assets/app/assessments/assessment_questionnaire/toolbar/toolbar.html',
      controller: control,
      scope: {
        requirements: '=chRequirements',
        search: '=chSearch',
        scopeOptions: '=chScopeOptions',
        responseOptions: '=chResponseOptions',
        scopeHeading: '=chScopeHeading',
        responseHeading: '=chResponseHeading',
        type: '@chAssessmentType'
      }
    };

  }]);

}(window.ch.assessmentManager));



