'use strict';

angular
  .module('fd.controllers.search', [
    'fd.services.people',
    'fd.directives.focusOn',
    'ui.router',
    'ui.gravatar',
    'ui.keypress',
    'ngAnimate'
  ])
  .controller('SearchCtrl', function($scope, $state, $stateParams, People, focus) {
    focus('search');

    if ($stateParams.query) {
      $scope.query = $stateParams.query;
      $scope.results = People.query({ q: $scope.query });
    }

    $scope.validness = function(person) {
      return person.validTickets.length;
    };

    $scope.doSearch = function() {
      if (!$scope.query) { return; }
      $state.go('search', { query: $scope.query });
    };
  });
