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
    $scope.loading = true;

    function ready() {
      $scope.loading = false;
    }

    $scope.validness = function(person) {
      return ((person.validTickets.length) * 10) +
             ((person.source === 'greve')  * 1);
    };

    $scope.doSearch = function() {
      if (!$scope.query) { return; }
      $state.go('search', { query: $scope.query });
    };

    if ($stateParams.query) {
      $scope.query = $stateParams.query;
      $scope.results = People.query({ q: $scope.query }, ready);
    }

  });
