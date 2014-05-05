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
  .controller('PaymentCtrl', function($scope, $state, People, person, focus) {
    $scope.step = { xid: person.xid };

    $scope.focusMoney     = _.partial(focus, 'money');
    $scope.focusPromocode = _.partial(focus, 'promocode');
    $scope.focusProof     = _.partial(focus, 'proof');

    $scope.money = function() {
      $scope.fastForward('person.choose_category');
    };
    $scope.promocode = function() {
      $scope.fastForward('person.payment_promocode');
    };
    $scope.proof = function() {
      $scope.fastForward('person.payment_proof');
    };

    if (!_(person.validTickets).isEmpty()) {
      $scope.fastForward('person.fill_badge_name');
    }
    $scope.focusMoney();

  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.payment', {
        url: '^/person/:xid/payment',
        resolve: {
          person: function(People, $stateParams) { return People.get({ xid: $stateParams.xid }).$promise; }
        },
        views: {
          step: { controller: 'PaymentCtrl', templateUrl: 'modules/steps/payment.html' }
        }
      });
  });
