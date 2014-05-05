(function(inputs){

  inputs.directive('chCheckbox', [function(){

    var control = ['$scope', controllerFunc];

    return {
      restrict: 'A',
      templateUrl: 'assets/javascripts/app/inputs/checkbox.html',
      replace: false,
      controller: control,
      scope: {
        htCheckboxId: '@',
        onChange: '&htCheckboxChange',
        htCheckboxModel: '=',
        htCheckboxPartial: '='
      }
    };

    function controllerFunc($scope) {
      $scope.change = function() {
        $scope.onChange({value: $scope.htCheckboxModel});
      };
    }

  }]);

}(window.ch.inputs));