'use strict';

angular
  .module('fd.controllers.person', [
    'fd',
    'fd.controllers.search',
    'fd.services.people',
    'ui.router',
    'ui.gravatar',
    'ui.keypress',
  ])
  .controller('PersonCtrl', function($scope, $window, $stateParams, People) {
    $scope.person = People.get({xid: $stateParams.xid});
  });
