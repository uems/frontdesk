'use strict';

angular
  .module('fd.steps.fillBadgeCorp', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('FillBadgeCorpCtrl', function($scope, $stateParams, $state, People, focus, lazyCommit) {
    var locator = { xid: $stateParams.xid };

    People.get(locator).$promise.then(function(person) {
      focus('badgeCorp');

      $scope.commitBadge = function() {
        People.setBadge(locator, $scope.step, function() { $scope.reload('person'); });
      };

      $scope.step = {
        xid: $stateParams.xid,
        badgeCorp: person.badgeCorp,
      };

      $scope.commitBadgeCorp = lazyCommit(People.setBadgeCorp, locator, 'person.give_badge', person, $scope, 'badgeCorp');
    });
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.fill_badge_corp', {
        url: '^/person/:xid/fill-badge-corp',
        views: {
          step: { controller: 'FillBadgeCorpCtrl', templateUrl: 'modules/steps/fillBadgeCorp.html' }
        }
      });
  });
