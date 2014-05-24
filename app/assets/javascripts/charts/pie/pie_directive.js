(function(app) {

  var
    definitions;

  definitions = [
    'chPieFactory',
    pie
  ];

  app.directive('chPie', definitions);

  function pie(pieFactory) {

    return {
      restrict: 'AC',
      replace: true,
      templateUrl: 'assets/charts/pie/pie.html',
      link: link,
      scope: {
        dataSet: '=chDataSet',
        config: '=chConfig'
      }
    };

    function link(scope, elem, attrs) {
      var
        dataset,
        chart;

      dataset = _.map(scope.dataSet, function(val, key) {
          return [key, val];
        });

      chart = pieFactory.create(elem[0], scope.config, dataset);
    }
  }

})(window.ch.charts);