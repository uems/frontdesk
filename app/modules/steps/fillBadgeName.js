'use strict';

angular
  .module('fd.steps.fillBadgeName', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('FillBadgeNameCtrl', function($scope, $state, People, person, focus, lazyCommit) {
    var locator = { xid: person.xid };
    $scope.step = { xid: person.xid, badgeName: person.badgeName || person.name };

    focus('badgeName');


    $scope.commitBadgeName = lazyCommit(People.setBadgeName, locator, 'person.fill_badge_corp', person, $scope, 'badgeName');
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.fill_badge_name', {
        url: '^/person/:xid/fill-badge-name',
        resolve: {
          person: function(People, $stateParams) { return People.get({ xid: $stateParams.xid }).$promise; }
        },
        views: {
          step: { controller: 'FillBadgeNameCtrl', templateUrl: 'modules/steps/fillBadgeName.html' }
        }
      });
  });
