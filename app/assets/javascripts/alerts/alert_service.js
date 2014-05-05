(function(alerts) {
  alerts.factory('chAlertSvc', [function() {

    return {
      raise: raise
    };

    function raise(message) {
      $(document).trigger('chRaiseAlert', [message]);
    }

  }]);

}(window.ch.alerts));