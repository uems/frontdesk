'use strict';

angular.module('frontdeskApp')
  .controller('uPersonSearchCtrl', function($scope, $http) {
    $scope.doSearch = function() {
      $http.get('scripts/test.json').then(function(ret) {
        // FIXME: this is getting people directly from person controller's
        // scope; it would be better to have a service holding it, since
        // it's going to be used by multiple directives
        $scope.people = ret.data.results;
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
