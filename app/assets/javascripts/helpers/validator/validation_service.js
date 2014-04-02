Helper.factory('chValidator', [function() {
  if (typeof(String.prototype.trim) != 'function') {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }

  var invalidArray = function(arr) {
    if (angular.isArray(arr)) {
      return !arr.length || isInvalid(arr[0]);
    } else {
      return false;
    }
  };

  var invalidString = function(str) {
    return !str.trim().length
  };

  var invalidObject = function(obj) {
    if (angular.isObject(obj)) {
      angular.forEach(obj, function(value, key){
        if (isInvalid(value)) {
          return true;
        }
      })
    } else {
      return false;
    }
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
}]);