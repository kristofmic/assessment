(function(app) {

  app.factory('User', ['chApi', 'chAlertSvc', function(chApi, chAlertSvc){
    return {
      changePassword: changePassword
    };

    function changePassword(data) {
      chApi.update('api/change_password', data)
      .then(function(result) {
        chAlertSvc.raise(result.message);
      }, function(reason) {
        chAlertSvc.raise(reason.error);
      });
    }

  }]);

}(window.ch.template));