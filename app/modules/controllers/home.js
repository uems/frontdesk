'use strict';

angular
  .module('fd.controllers.home', [
    'ui.router',
    'ngAnimate'
  ])
  .config(function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '^/',
        views: {
          header: { controller: 'SearchCtrl', templateUrl: 'modules/views/search.html' },
          main:   { controller: 'HomeCtrl',   templateUrl: 'modules/views/home.html'   }
        }
      });
  })
  .controller('HomeCtrl', function($scope, $state) {
    $scope.createPerson = function() {
      $state.go('create');
    };

    $scope.singleBadge = function() {
      $state.go('single');
    };

    $scope.setPrinter = function() {
      $state.go('printer');
    };
  });
