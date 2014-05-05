(function(inputs){

  inputs.directive('chSelect', [function(){
    var control = ['$scope', controllerFunc];

    return {
      restrict: 'A',
      templateUrl: 'assets/inputs/selects/select.html',
      replace: false,
      link: linker,
      controller: control,
      scope: {
        options: '=chSelectOptions',
        label: '@chSelectOptionLabelProp',
        value: '@chSelectOptionValueProp',
        selected: '=chSelected',
        onSelect: '&chOnSelect'
      }
    };

    function linker(scope, elem, attrs) {
      scope.label = scope.label || 'label';
      scope.value = scope.value || 'value';

      scope.selectedLabel = scope.selected[scope.label];
      scope.selectedIcon = scope.selected.icon;

      scope.$watch('selected', function(newVal, oldVal) {
        if (angular.isObject(newVal)){
          scope.selected = newVal;
          scope.selectedLabel = scope.selected[scope.label];
          scope.selectedIcon = scope.selected.icon;
        }
      });
    }

    function controllerFunc($scope) {
      $scope.select = function(option) {
        $scope.selected = option;
        $scope.onSelect()({value: option[$scope.value], option: option});
      };
    }


  }]);

}(window.ch.inputs));