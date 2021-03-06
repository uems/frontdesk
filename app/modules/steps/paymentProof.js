/* global _ */
'use strict';

angular
  .module('fd.steps.paymentProof', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('PaymentProofCtrl', function($scope, $stateParams, $state, $timeout, People, person, focus) {
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
      $scope.fastForward('person.payment_pending');
    };

    $scope.boletoTickets = _(person.pendingTickets).where({ method: 'boleto' });
    $scope.notFound      = _($scope.boletoTickets).isEmpty();
    $scope.step = { xid: person.xid };

    if ($scope.notFound) {
      return $timeout(function() { $scope.fastForward('person.payment'); }, 5000);
    }

    $scope.focusFirstTicket();
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.payment_proof', {
        url: '^/person/:xid/payment/proof',
        resolve: {
          person: function(People, $stateParams) { return People.get({ xid: $stateParams.xid }).$promise; }
        },
        views: {
          step: { controller: 'PaymentProofCtrl', templateUrl: 'modules/steps/paymentProof.html' }
        }
      });
  });
