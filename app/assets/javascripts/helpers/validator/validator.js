(function(helper) {

  helper.factory('chValidator', ['$rootScope', '$window', function($rootScope, $window) {
    if (typeof(String.prototype.trim) != 'function') {
      String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
      };
    }

    return {
      isInvalid: isInvalid,
      isValid: isValid
    };

    function invalidArray(arr) {
      if (angular.isArray(arr)) {
        if (!arr.length) { return true; }
        for (var i = 0; i < arr.length; i++) {
          if (isInvalid(arr[i])) {
            return true;
          }
        }
      }
      return false;
    }

    function invalidString(str) {
      return !str.trim().length
    }

    function invalidObject(obj) {
      if (angular.isObject(obj)) {
        if (angular.equals(obj, {})) {
          return true;
        } else {
          var invalid = false;
          angular.forEach(obj, function(val) {
            if (isInvalid(val)) {
              invalid = true;
            }
          });
          return invalid;
        }
      }
      return false;
    };

    function isInvalid(model) {
      return !model
             || (angular.isObject(model) && (invalidArray(model) || invalidObject(model)))
             || (angular.isString(model) && invalidString(model));
    }

    function isValid(model) {
      return !isInvalid(model);
    }
  }]);

  helper.directive('chValidate', ['chValidator', function(validator){
    var
      data,
      linker;

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
    };
  }]);

}(window.ch.helper));