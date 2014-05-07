'use strict';

angular
  .module('fd.steps.printBadge', [
    'fd.services.currentPrinter',
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('PrintBadgeCtrl', function($scope, person, CurrentPrinter, People, Flash) {
    $scope.demand(person.validTickets, true);

    $scope.currentPrinter = CurrentPrinter.get();

    // FIXME: record printer choice somewhere in the client
    var locator = { xid: person.xid, printer: $scope.currentPrinter };

    $scope.print = function() {
      People.printBoth(locator, $scope.step, function() {
        $scope.reload('person.give_badge');
      }, function(response) {
        Flash.set(response.data.err);
        $scope.reload('person.give_badge');
      });
    };

    $scope.print();
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.print_badge', {
        url: '^/person/:xid/print-badge',
        resolve: {
          person: function(People, $stateParams) { return People.get({ xid: $stateParams.xid }).$promise; },
        },
        views: {
          step: { controller: 'PrintBadgeCtrl', templateUrl: 'modules/steps/printBadge.html' }
        }
      });
  });
