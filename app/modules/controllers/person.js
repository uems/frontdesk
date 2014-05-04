'use strict';

angular
  .module('fd.controllers.person', [
    'fd',
    'fd.controllers.search',
    'fd.services.people',
    'ui.router',
    'ui.gravatar',
    'ui.keypress',
    'ngAnimate'
  ])
  .controller('PersonMainCtrl', function($scope, $stateParams, $state, People) {
    // FIXME: improve state selection smartness
    $scope.fastForward = function(nextState) {
      $state.go(nextState);
    };
    $scope.reload = function(nextState) {
      People.get({xid: $stateParams.xid}).$promise.then(function(person) {
        $scope.person = person;
        $scope.ticket = person.validTickets[0] || person.pendingTickets[0];
        $scope.hasValidTicket = Boolean(person.validTickets.length);
        $scope.isForeign = person.country !== 'Brazil';
        $state.go(nextState || 'person.fill_name');
      });
    };

    $scope.reload();
  });
