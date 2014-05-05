/* global _ */
'use strict';

angular
  .module('fd.steps.giveBadge', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('GiveBadgeCtrl', function($scope, $state, People, person, focus) {
    var locator = { xid: person.xid };

    $scope.step = { xid: person.xid };

    $scope.focusGiven   = _.partial(focus, 'given');
    $scope.focusReprint = _.partial(focus, 'reprint');
    $scope.focusFix     = _.partial(focus, 'fix');

    $scope.fix = function() {
      $scope.fastForward('person.fill_badge_name');
    };
    $scope.reprint = function() {
      $scope.fastForward('person.print_badge');
    };

    $scope.given = function() {
      People.giveBadge(locator, $scope.step, function() {
        $scope.fastForward('person.done');
      });
    };

    $scope.focusGiven();
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.give_badge', {
        url: '^/person/:xid/give-badge',
        resolve: {
          person: function(People, $stateParams) { return People.get({ xid: $stateParams.xid }).$promise; }
        },
        views: {
          step: { controller: 'GiveBadgeCtrl', templateUrl: 'modules/steps/giveBadge.html' }
        }
      });
  });
