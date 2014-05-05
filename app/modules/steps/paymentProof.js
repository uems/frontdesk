/* global _ */
'use strict';

angular
  .module('fd.steps.paymentProof', [
    'fd.steps.payment',
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('PaymentProofCtrl', function($scope, $stateParams, $state, $timeout, People, focus) {
    var locator = { xid: $stateParams.xid };

    $scope.focusAccept = _.partial(focus, 'accept');
    $scope.focusBack   = _.partial(focus, 'back');

    $scope.focusFirstTicket = _.partial(focus, 'ticket-0');

    $scope.accept = function() {
      People.acceptProof(locator, $scope.step, function() {
        $scope.fastForward('person.fill_badge_name');
      });
    };

    $scope.back = function() {
      $scope.fastForward('person.payment');
    };

    People.get(locator).$promise.then(function(person) {
      $scope.tickets = person.pendingTickets;
      $scope.notFound = person.pendingTickets.length === 0;
      $scope.step = {
        xid: person.xid,
      };
      if (!person.pendingTickets.length) {
        return $timeout(function() { $scope.fastForward('person.payment'); }, 5000);
      }
      $scope.focusFirstTicket();
    });
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.paymentProof', {
        url: '^/person/:xid/payment/proof',
        views: {
          step: { controller: 'PaymentProofCtrl', templateUrl: 'modules/steps/paymentProof.html' }
        }
      });
  });