'use strict';

angular
  .module('fd.steps.fillBadgeName', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('FillBadgeNameCtrl', function($scope, $stateParams, $state, People, focus, lazyCommit) {
    var locator = { xid: $stateParams.xid };

    People.get(locator).$promise.then(function(person) {
      focus('badgeName');

      $scope.commitBadge = function() {
        People.setBadge(locator, $scope.step, function() { $scope.reload('person'); });
      };

      $scope.step = {
        xid: $stateParams.xid,
        badgeName: person.badgeName || person.name,
      };

      $scope.commitBadgeName = lazyCommit(People.setBadgeName, locator, 'person.fill_badge_corp', person, $scope, 'badgeName');
    });
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.fill_badge_name', {
        url: '^/person/:xid/fill-badge-name',
        views: {
          step: { controller: 'FillBadgeNameCtrl', templateUrl: 'modules/steps/fillBadgeName.html' }
        }
      });
  });
