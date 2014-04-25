'use strict';

angular.module('frontdeskApp')
  .controller('SearchCtrl', function ($scope, $http) {
    $scope.people = [];
  })
  .config(function($stateProvider) {
    $stateProvider
        .state('home', {
          url: '/',
          views: {
            'top': { templateUrl: 'views/search.html', controller: 'SearchCtrl' }
          }
        })
  });
