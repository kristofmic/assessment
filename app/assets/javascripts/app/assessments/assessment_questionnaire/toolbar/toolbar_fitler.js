(function(app) {

  app.filter('chToolbarFilters', [function() {

    var filterFunction = function(input, filters) {
      if (!filters || !filters.length) {
        return input;
      }
      else {
        var filteredResult = _.filter(input, function(el) {
          var keep = true;
          _.each(filters, function(f) {
            if (angular.isArray(el[f.key])) {
              if (_.isEmpty(f.value) && _.isEmpty(el[f.key])) {
                return false; // break
              }
              if (!_.contains(el[f.key], f.value)) {
                keep = false;
                return false; // break
              }
            } else {
              if (angular.isObject(el[f.key])) {
                if (_.isEmpty(f.value) && _.isEmpty(el[f.key])) {
                  return false; // break
                }
              }
              if (el[f.key] !== f.value) {
                keep = false;
                return false; // break
              }
            }
          });
          return keep;
        });

        return filteredResult;
      }
    };

    return filterFunction;
  }]);

}(window.ch.assessmentManager));