'use strict';

angular
  .module('fd.controllers.person', [
    'fd',
    'fd.controllers.search',
    'fd.services.people',
    'ui.router',
    'ui.gravatar',
    'ui.keypress',
    'ngAnimate'
  ])
  .controller('PersonCtrl', function($scope, $window, $stateParams, People) {
    $scope.back = function() {
      $window.history.back();
    };
    $scope.person = People.get({xid: $stateParams.xid});
  });
