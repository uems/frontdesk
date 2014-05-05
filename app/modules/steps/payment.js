/* global _ */
'use strict';

angular
  .module('fd.steps.payment', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('PaymentCtrl', function($scope, $stateParams, $state, People, focus) {
    var locator = { xid: $stateParams.xid };
    $scope.loaded = false;

    $scope.step = {
      xid: $stateParams.xid,
    };

    $scope.focusMoney     = _.partial(focus, 'money');
    $scope.focusPromocode = _.partial(focus, 'promocode');
    $scope.focusProof     = _.partial(focus, 'proof');

    $scope.money = function() {
      $scope.fastForward('person.paymentMoney');
    };
    $scope.promocode = function() {
      $scope.fastForward('person.paymentPromocode');
    };

    $scope.proof = function() {
      $scope.fastForward('person.paymentProof');
    };

    People.get(locator).$promise.then(function(person) {
      if (person.validTickets) {
        $scope.fastForward('person.fill_badge_name');
      }
      $scope.loaded = true;
      $scope.step = {
        xid: person.xid,
      };
    });

    $scope.focusProof();
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.payment', {
        url: '^/person/:xid/payment',
        views: {
          step: { controller: 'PaymentCtrl', templateUrl: 'modules/steps/payment.html' }
        }
      });
  });
