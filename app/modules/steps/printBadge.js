/* global _ */
'use strict';

angular
  .module('fd.steps.printBadge', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('PrintBadgeCtrl', function($scope, $stateParams, People, focus) {
    var locator = { xid: $stateParams.xid };

    $scope.focusCorrect = _.partial(focus, 'correct');
    $scope.focusPrint   = _.partial(focus, 'print');

    $scope.commitPrint = function() {
      $scope.trying = true;
      People.printBadge(locator, $scope.step).$promise.then(function() {
        $scope.trying = false;
        $scope.reload('person.give_badge');
      }).catch(function(err) {
        focus('print');
        $scope.trying = false;
        console.log(err.data);
      });
    };

    People.get(locator).$promise.then(function(person) {
      focus('print');
      $scope.step = {
        xid: $stateParams.xid,
        printer: 1,
        badgeName: person.badgeName,
        badgeCorp: person.badgeCorp
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
