'use strict';

angular
  .module('fd.search',['ui.router', 'ngResource'])
  .controller('SearchCtrl', function($scope, $resource) {
    $scope.query = '';
    $scope.results = [];

    $scope.search = function() {
      console.log($scope);
      $scope.results = $resource('http://localhost:3000/search/'+$scope.query).query();
    };
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('search', {
        url: '^/',
        templateUrl: 'modules/controllers/search.html',
        controller: 'SearchCtrl'
      });
  });
