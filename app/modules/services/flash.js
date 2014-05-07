'use strict';

angular
  .module('fd.services.flash', [ ])
  .service('Flash', function() {
    var message = null;

    this.set = function(value) {
      message = value;
    };
    this.read = function() {
      var result = message;
      message = null;
      return result;
    };
  });
