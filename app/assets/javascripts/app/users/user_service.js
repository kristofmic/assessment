(function(app) {

  app.factory('User', ['chAjax', 'chAlertSvc', function(chAjax, chAlertSvc){
    return {
      changePassword: changePassword
    };

    function changePassword(data) {
      chAjax.update('api/change_password', data)
      .then(function(result) {
        chAlertSvc.raise(result.message);
      }, function(reason) {
        chAlertSvc.raise(reason.error);
      });
    }

  }]);

}(window.ch.assessmentManager));