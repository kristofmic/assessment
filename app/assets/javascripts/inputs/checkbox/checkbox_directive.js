(function(inputs){

  inputs.directive('chCheckbox', [function(){

    var control = ['$scope', controllerFunc];

    return {
      restrict: 'A',
      templateUrl: 'assets/inputs/checkbox/checkbox.html',
      replace: false,
      controller: control,
      scope: {
        checkboxId: '@chCheckboxId',
        onChange: '&chCheckboxChange',
        model: '=chCheckboxModel',
        partial: '=chCheckboxPartial'
      }
    };

    function controllerFunc($scope) {
      $scope.change = function() {
        $scope.onChange({value: $scope.model});
      };
    }

  }]);

}(window.ch.inputs));