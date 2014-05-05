(function(validation) {

  validation.directive('chValidate', ['chValidator', function(validator){
    var data;

    return {
      restrict: 'AC',
      link: linker
    };

    function linker(scope, elem, attrs) {
      if (angular.equals(attrs.ngRequired,'true')) {
        elem.bind('blur', function() {
          data = attrs.chValidate;
          if (validator.isInvalid(data)) {
            elem.addClass('has-error');
          } else {
            elem.removeClass('has-error');
          }
        });
      }

      scope.$on('chValidate', function(e) {
        elem.triggerHandler('blur');
      });

      scope.$on('chResetValidation', function(e) {
        elem.removeClass('has-error');
      });
    }
  }]);

}(global.ch.validation));