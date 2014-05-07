'use strict';

angular
  .module('fd.controllers.create', [
    'fd.services.people',
    'fd.directives.focusOn',
    'ui.router',
    'ui.gravatar',
    'ui.keypress',
    'ngAnimate'
  ])
  .controller('CreateCtrl', function($scope, $state, $stateParams, People, focus) {
    focus('email');

    $scope.doCreate = function() {
      if (!$scope.email) { return; }
      People.create({ }, { email: $scope.email }, function(result) {
        $state.go('person', { xid: result.xid });
      });
    };
  });
