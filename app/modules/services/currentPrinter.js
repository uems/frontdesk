'use strict';

angular
  .module('fd.services.currentPrinter', [ 'ngCookies' ])
  .service('CurrentPrinter', function($cookies, DefaultPrinter) {
    this.set = function(value) {
      $cookies.currentPrinter = value;
    };
    this.get = function() {
      return $cookies.currentPrinter || DefaultPrinter;
    };
  });
