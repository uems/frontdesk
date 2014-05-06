/* global _ */
'use strict';

angular
  .module('fd.steps.paymentPromocode', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('PaymentPromocodeCtrl', function($scope, People, person, focus) {
    var locator = { xid: person.xid };

    var hasPromocode = !_(person.promotionalCode).isEmpty();

    if (hasPromocode) {
      $scope.fastForward('person.payment_pending');
    }

    focus('hash');

    $scope.step = {
      xid: person.xid,
      hash: null
    };

    $scope.applyPromocode = function() {
      People.applyPromocode(locator, $scope.step, function() {
        $scope.reload('person');
      }, function(response) {
        $scope.error = response.data.err;
      });
    };

  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.payment_promocode', {
        url: '^/person/:xid/payment/promocode',
        resolve: {
          person: function(People, $stateParams) { return People.get({ xid: $stateParams.xid }).$promise; }
        },
        views: {
          step: { controller: 'PaymentPromocodeCtrl', templateUrl: 'modules/steps/paymentPromocode.html' }
        }
      });
  });
