/* global _ */
'use strict';

angular
  .module('fd.steps.paymentMoney', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('PaymentMoneyCtrl', function($scope, $timeout, People, person, focus) {
    var locator = { xid: person.xid };
    $scope.step = { xid: person.xid, ticket: person.payableTicket };

    $scope.focusAccept = _.partial(focus, 'accept');
    $scope.focusBack   = _.partial(focus, 'back');

    $scope.back = function() {
      $scope.fastForward('person.payment_pending');
    };

    $scope.accept = function() {
      People.acceptCash(locator, $scope.step, function() {
        $scope.fastForward('person.fill_badge_name');
      });
    };


    $scope.focusAccept();
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.payment_money', {
        url: '^/person/:xid/payment-money',
        resolve: {
          person: function(People, $stateParams) { return People.get({ xid: $stateParams.xid }).$promise; }
        },
        views: {
          step: { controller: 'PaymentMoneyCtrl', templateUrl: 'modules/steps/paymentMoney.html' }
        }
      });
  });
