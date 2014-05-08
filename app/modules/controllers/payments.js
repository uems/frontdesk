/* global _ */
'use strict';

angular
  .module('fd.controllers.payments', [
    'fd.services.currentPrinter',
    'fd.services.payments',
    'fd.directives.focusOn',
    'fd.config',
    'ui.router',
    'ui.gravatar',
    'ui.keypress',
    'ngAnimate'
  ])
  .controller('PaymentsCtrl', function($scope, $state, $stateParams, Operators, Payments, focus) {
    $scope.query = {
      ip:    Operators[$stateParams.operator],
      day:   $stateParams.day,
      start: $stateParams.start,
      end:   $stateParams.end
    };
    $scope.operator = $stateParams.operator;

    $scope.doQuery = function() {
      $scope.payments = Payments.query($scope.query);
    };

    $scope.periodFilter = function (payment) {
      var date = new Date(payment.when);
      var afterStartHour = !$scope.query.start || parseInt($scope.query.start) <= date.getHours();
      var beforeEndHour  = !$scope.query.end   || parseInt($scope.query.end)   >= date.getHours();

      return afterStartHour && beforeEndHour;
    };

    $scope.date = function(d) {
      return (new Date(d)).toLocaleDateString();
    };
    $scope.time = function(d) {
      return (new Date(d)).toLocaleTimeString();
    };


    function summer(a,b) { return a + b; }

    $scope.sum = function(entries) {
      return _.chain(entries)
              .pluck('paid')
              .reduce(summer, 0)
              .value();
    };
    $scope.doQuery();

    focus('start');
  });
