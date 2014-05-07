'use strict';

angular
  .module('fd.controllers.home', [
    'ui.router',
    'ngAnimate'
  ])
  .controller('HomeCtrl', function($scope, $state) {
    $scope.createPerson = function() {
      $state.go('create');
    };

    $scope.giveBadge = function() {
      //Need Implement
    };

    $scope.setPrinter = function() {
      //Need Implement
    };
  });
