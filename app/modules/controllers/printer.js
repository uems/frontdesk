'use strict';

angular
  .module('fd.controllers.printer', [
    'fd.services.currentPrinter',
    'fd.directives.focusOn',
    'ui.router',
    'ui.gravatar',
    'ui.keypress',
    'ngAnimate'
  ])
  .config(function($stateProvider) {
    $stateProvider
      .state('printer', {
        url: '^/printer',
        views: {
          header: { controller: 'NavCtrl',     templateUrl: 'modules/views/nav.html' },
          main:   { controller: 'PrinterCtrl', templateUrl: 'modules/views/printer.html' }
        }
      });
  })
  .controller('PrinterCtrl', function($scope, $state, $window, CurrentPrinter, AllPrinters, focus) {
    $scope.currentPrinter = CurrentPrinter.get();
    $scope.availablePrinters = AllPrinters;
    var index = $scope.availablePrinters.indexOf($scope.currentPrinter);

    $scope.setPrinter = function(printer) {
      CurrentPrinter.set(printer);
      $window.history.back();
    };

    $scope.focusPrev = function(current) {
      if (current === 0) { return; }
      focus('printer-'+(current-1));
    };
    $scope.focusNext = function(current) {
      if (current === $scope.availablePrinters.length-1) { return; }
      focus('printer-'+(current+1));
    };

    focus('printer-'+index);
  });
