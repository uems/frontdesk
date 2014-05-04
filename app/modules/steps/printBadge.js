'use strict';

angular
  .module('fd.steps.printBadge', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('PrintBadgeCtrl', function($scope, $stateParams, People) {
    // FIXME: record printer choice somewhere in the client
    var locator = {
      xid: $stateParams.xid,
      printer: 1
    };

    function success(result) {
      console.log(result.result);
      $scope.fastForward('person.give_badge');
    }
    function failure(err) {
      console.log(err);
    }

    People.printBoth(locator, success, failure);
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
