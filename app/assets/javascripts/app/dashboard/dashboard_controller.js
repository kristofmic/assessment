(function(app){

  var
    dependencies;

  dependencies = [
    '$scope',
    'requirements',
    'attributes',
    DashboardCtrl
  ];

  app.controller('DashboardCtrl', dependencies);

  function DashboardCtrl($scope, requirements, attributes) {
    var
      sectionOrder;

    sectionOrder = {
      policy: 0,
      procedure: 1,
      implemented: 2,
      measured: 3,
      managed: 4
    };

    $scope.sections = _.map(requirements, mapRequirements);
    console.log($scope.sections);


    function mapRequirements(val, key, obj) {
      var
        section = {};

      section.label = key;
      section.order = sectionOrder[key];

      section.controls = {}
      section.controls.data = _.groupBy(val, 'Control');
      section.controls.count = _.keys(section.controls.data).length;

      section.requirements = {}
      section.requirements.data = val;
      section.requirements.count = val.length

      return section;
    }
  }

}(window.ch.assessmentManager));