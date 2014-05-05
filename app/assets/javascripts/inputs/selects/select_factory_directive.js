(function(inputs){

  inputs.directive('chSelectFactory', ['$compile', function($compile){

    return {
      restrict: 'A',
      replace: true,
      terminal: true,
      priority: 1000,
      link: linker,
      scope: {
        options: '=chSelectOptions',
        labelProp: '@chSelectOptionLabelProp',
        valueProp: '@chSelectOptionValueProp',
        selected: '=chSelected',
        onSelect: '&chOnSelect'
      }
    };

    function selectFactory(type) {
      var template = "<span ";

      if (angular.isArray(type)) {
        template += "ch-multi-select ";
      } else {
        template += "ch-select ";
      }

      template += "ch-select-options='options' " +
                  "ch-select-option-label-prop='{{labelProp}}' " +
                  "ch-select-option-value-prop='{{valueProp}}' " +
                  "ch-selected='selected' " +
                  "ch-on-select='onSelect'></span>";
      return template;
    }

    function linker(scope, element, attrs) {
      element.html(
        selectFactory(scope.selected)
      );
      $compile(element.contents())(scope);
    }

  }]);

}(window.ch.inputs));