'use strict';

angular
  .module('fd.controllers.nav', [
    'fd',
    'fd.services.currentPrinter',
    'ui.router',
  ])
  .controller('NavCtrl', function($scope, $state, CurrentPrinter) {
    $scope.home = function() {
      $state.go('home');
    };

    $scope.printer = CurrentPrinter.get();

    $scope.changePrinter = function() {
      $state.go('printer');
    };
  });
