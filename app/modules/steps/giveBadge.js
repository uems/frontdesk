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
  .controller('GiveBadgeCtrl', function($scope, $stateParams, $state, People, focus) {
    var locator = { xid: $stateParams.xid };

    $scope.step = {
      printer: 1
    };

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
      $scope.fastForward('home');
    };

    People.get(locator).$promise.then(function() {
      $scope.focusGiven();
      $scope.step = {};
    });
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.give_badge', {
        url: '^/person/:xid/give-badge',
        views: {
          step: { controller: 'GiveBadgeCtrl', templateUrl: 'modules/steps/giveBadge.html' }
        }
      });
  });
