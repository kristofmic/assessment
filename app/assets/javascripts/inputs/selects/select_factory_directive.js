(function(inputs){

  inputs.directive('htSelectFactory', ['$compile', function($compile){

    return {
      restrict: 'A',
      replace: true,
      terminal: true,
      priority: 1000,
      link: linker,
      scope: {
        htSelectOptions: '=',
        htSelectOptionLabelProp: '@',
        htSelectOptionValueProp: '@',
        htSelected: '=',
        htOnSelect: '&'
      }
    };

    function selectFactory(type) {
      var template = "<span ";

      if (angular.isArray(type)) {
        template += "ht-multi-select ";
      } else {
        template += "ht-select ";
      }

      template += "ht-select-options='htSelectOptions' " +
                  "ht-select-option-label-prop='{{htSelectOptionLabelProp}}' " +
                  "ht-select-option-value-prop='{{htSelectOptionValueProp}}' " +
                  "ht-selected='htSelected' " +
                  "ht-on-select='htOnSelect'></span>";
      return template;
    }

    function linker(scope, element, attrs) {
      element.html(
        selectFactory(scope.htSelected)
      );
      $compile(element.contents())(scope);
    }

  }]);

}(window.ch.inputs));