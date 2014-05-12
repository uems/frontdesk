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
    'angularMoment',
    'ngAnimate'
  ])
  .config(function($stateProvider) {
    $stateProvider
      .state('payments', {
        url: '^/payments/:operator',
        views: {
          header: { controller: 'NavCtrl',      templateUrl: 'modules/views/nav.html' },
          main:   { controller: 'PaymentsCtrl', templateUrl: 'modules/views/payments.html' }
        }
      });
  })
  .controller('PaymentsCtrl', function($scope, $state, $stateParams, Operators, Payments, focus) {
    $scope.query = {
      day:   $stateParams.day,
      start: $stateParams.start,
      end:   $stateParams.end
    };
    $scope.operator = $stateParams.operator || null;
    $scope.operators = _(Operators).keys();

    $scope.issueTime = (new Date()).toLocaleString();

    $scope.changeOperator = function() {
      $state.go('payments', { operator: $scope.operator });
    };

    $scope.doQuery = function() {
      $scope.query.ip = Operators[$stateParams.operator];
      if ($scope.operator) {
        $scope.payments = Payments.query($scope.query);
      }
    };

    $scope.periodFilter = function (payment) {
      var date = new Date(payment.when);
      var afterStartHour = !$scope.query.start || parseInt($scope.query.start) <= date.getHours();
      var beforeEndHour  = !$scope.query.end   || parseInt($scope.query.end)   >= date.getHours();

      return afterStartHour && beforeEndHour;
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

