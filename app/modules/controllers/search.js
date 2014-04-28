'use strict';

angular
  .module('fd.controllers.search', [
    'fd.services.people',
    'ui.router',
    'ui.gravatar',
    'ui.keypress',
  ])
  .controller('SearchCtrl', function($scope, $state, $stateParams, People) {
    $scope.query = $stateParams.query;
    $scope.results = People.query({ q: $scope.query });

    $scope.doSearch = function() {
      $state.go('search', { query: $scope.query });
    };
  });
