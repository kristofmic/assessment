(function(inputs){

  inputs.directive('chStar', [function(){

    return {
      restrict: 'A',
      templateUrl: 'assets/inputs/star/star.html',
      replace: false,
      scope: {
        model: '=chStarModel',
        id: '@chStarId'
      }
    };

  }]);

}(window.ch.inputs));