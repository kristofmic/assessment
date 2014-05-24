(function(app){
  var
    dependencies;

  dependencies = [
    pieFactory
  ];

  app.factory('chPieFactory', dependencies);

  function pieFactory() {

    return {
      create: create
    }

    function create(element, config, dataset) {
      var
        chart;

      config = config || {};

      chart = c3.generate({
        bindto: element,
        size: {
          height: 250,
          width: 250
        },
        data: {
          columns: dataset,
          type: 'pie'
        },
        pie: {
          title: config.title || ''
        },
        tooltip: {
          format: {
            value: function(val, ratio, id) {
              return val;
            }
          }
        }
      });

      return chart;
    }

  }

})(window.ch.charts);