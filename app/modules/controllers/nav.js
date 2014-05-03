'use strict';

angular
  .module('fd.controllers.nav', [
    'fd',
    'ui.router',
  ])
  .controller('NavCtrl', function($scope, $state) {
    $scope.home = function() {
      $state.go('home');
    };
  });
