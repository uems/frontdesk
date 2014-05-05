/* global _ */
'use strict';

angular
  .module('fd.steps.pay', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('PayCtrl', function($scope, $stateParams, $state, People, focus) {
    var locator = { xid: $stateParams.xid };

    $scope.step = {
      xid: $stateParams.xid,
    };

    $scope.focusMoney     = _.partial(focus, 'money');
    $scope.focusPromocode = _.partial(focus, 'promocode');
    $scope.focusProof     = _.partial(focus, 'proof');

    $scope.money = function() {
      $scope.fastForward('person.pay.money');
    };
    $scope.promocode = function() {
      $scope.fastForward('person.pay.promocode');
    };

    $scope.proof = function() {
      $scope.fastForward('person.pay.proof');
    };

    People.get(locator).$promise.then(function(person) {
      if (person.validTickets) {
      }
      $scope.step = {
        xid: person.xid,
      };
    });

    $scope.focusMoney();
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.pay', {
        url: '^/person/:xid/payt',
        views: {
          step: { controller: 'PayCtrl', templateUrl: 'modules/steps/pay.html' }
        }
      });
  });
