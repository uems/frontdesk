'use strict';

angular.module('frontdeskApp')
  .controller('uPersonSearchCtrl', function($scope, $http) {
    $scope.doSearch = function() {
      var strSearch = $scope.strSearch;
      return sPeople(strSearch, $http).then(function(result) {
        $scope.people = result.results;
        $scope.results_number = result.results_number;
        $scope.show_results = true;
      });
    };
  })
  .directive('uPersonSearch', function () {
    return {
      templateUrl: 'views/uPersonSearch.html',
      controller: 'uPersonSearchCtrl',
      restrict: 'E'
    }
  });
