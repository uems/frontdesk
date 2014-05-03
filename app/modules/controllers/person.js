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
    $scope.fastForward = function(nextState) {
      $state.go(nextState);
    };
    $scope.reload = function(nextState) {
      People.get({xid: $stateParams.xid}).$promise.then(function(person) {
        $scope.person = person;
        $state.go(nextState || 'person.fill_name');
      });
    };

    $scope.reload();
  });
