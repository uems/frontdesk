'use strict';

angular
  .module('fd.steps.fillBadgeCorp', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('FillBadgeCorpCtrl', function($scope, People, person, focus, lazyCommit) {
    $scope.demand(person.validTickets);

    var locator = { xid: person.xid };
    $scope.step = { xid: person.xid, badgeCorp: person.badgeCorp, };

    focus('badgeCorp');

    $scope.commitBadgeCorp = lazyCommit(People.setBadgeCorp, locator, 'person.print_badge', person, $scope, 'badgeCorp');
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.fill_badge_corp', {
        url: '^/person/:xid/fill-badge-corp',
        resolve: {
          person: function(People, $stateParams) { return People.get({ xid: $stateParams.xid }).$promise; }
        },
        views: {
          step: { controller: 'FillBadgeCorpCtrl', templateUrl: 'modules/steps/fillBadgeCorp.html' }
        }
      });
  });
