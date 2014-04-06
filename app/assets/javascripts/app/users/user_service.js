Template.factory('User', ['chApi', 'chAlertSvc', function(chApi, chAlertSvc){
  var changePassword = function(data) {
    chApi.update('api/change_password', data)
    .then(function(result) {
      chAlertSvc.raise(result.message);
    }, function(reason) {
      chAlertSvc.raise(reason.error);
    });
  }

  return {
    changePassword: changePassword
  }
}]);