
  Helper.factory('chValidator', ['$rootScope', '$window', function($rootScope, $window) {
    if (typeof(String.prototype.trim) != 'function') {
      String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
      };
    }

    var invalidArray = function(arr) {
      if (angular.isArray(arr)) {
        if (!arr.length) { return true; }
        for (var i = 0; i < arr.length; i++) {
          if (isInvalid(arr[i])) {
            return true;
          }
        }
      }
      return false;
    };

    var invalidString = function(str) {
      return !str.trim().length
    };

    var invalidObject = function(obj) {
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

    var isInvalid = function(model) {
      return !model
             || (angular.isObject(model) && (invalidArray(model) || invalidObject(model)))
             || (angular.isString(model) && invalidString(model));
    };

    var isValid = function(model) {
      return !isInvalid(model)
    };

    return {
      isInvalid: isInvalid,
      isValid: isValid
    }
  }])
  Helper.directive('chValidate', ['chValidator', function(validator){
    var data;
    var linker = function(scope, elem, attrs) {
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

    return {
      restrict: 'AC',
      link: linker
    }
  }]);
