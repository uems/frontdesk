'use strict';

angular.module('frontdeskApp')
  .controller('PeopleCtrl', function ($scope, $http) {
    $scope.doSearch = function() {
      $http.get('scripts/test.json').then(function(ret) {
        $scope.items = ret.data.results;
      });
    };
  });
