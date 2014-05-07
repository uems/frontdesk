/* global _ */
'use strict';

angular
  .module('fd.controllers.payments', [
    'fd.services.currentPrinter',
    'fd.services.payments',
    'fd.directives.focusOn',
    'ui.router',
    'ui.gravatar',
    'ui.keypress',
    'ngAnimate'
  ])
  .controller('PaymentsCtrl', function($scope, $state, $stateParams, Payments) {
    var locator = { ip: $stateParams.ip };
    $scope.payments = Payments.query(locator);

    function summer(a,b) { return a + b; }

    $scope.sum = function() {
      return _.chain($scope.payments)
              .pluck('paid')
              .reduce(summer, 0)
              .value();
    };
    window.X = $scope;
  });
