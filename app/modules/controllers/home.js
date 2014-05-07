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

    $scope.singleBadge = function() {
      $state.go('single');
    };

    $scope.setPrinter = function() {
      $state.go('printer');
    };
  });
