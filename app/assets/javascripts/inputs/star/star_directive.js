(function(inputs){

  inputs.directive('htStar', [function(){

    return {
      restrict: 'A',
      templateUrl: 'assets/javascripts/app/inputs/star.html',
      replace: false,
      scope: {
        htStarModel: '=',
        htStarId: '@'
      }
    };

  }]);

}(window.ch.inputs));