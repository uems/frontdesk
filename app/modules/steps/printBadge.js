'use strict';

angular
  .module('fd.steps.printBadge', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('PrintBadgeCtrl', function($scope, $stateParams, $state, People, focus) {
    var locator = { xid: $stateParams.xid };

    People.get(locator).$promise.then(function(person) {
      focus('name');

      $scope.step = {
        xid: $stateParams.xid,
        badgeName: person.badgeName,
        badgeCorp: person.badgeCorp
      };

      $scope.printBage = function() {
        People.printBadge(locator, $scope.step);
      };
    });
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.print_badge', {
        url: '^/person/:xid/print-badge',
        views: {
          step: { controller: 'PrintBadgeCtrl', templateUrl: 'modules/steps/printBadge.html' }
        }
      });
  });
