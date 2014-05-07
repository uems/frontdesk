/* global _ */
'use strict';

angular
  .module('fd.controllers.single', [
    'fd.services.currentPrinter',
    'fd.services.people',
    'fd.directives.focusOn',
    'ui.router',
    'ui.gravatar',
    'ui.keypress',
    'ngAnimate'
  ])
  .controller('SingleCtrl', function($scope, $state, $stateParams, CurrentPrinter, Badge, focus) {
    focus('reason');

    var currentPrinter = CurrentPrinter.get();

    $scope.focusReason = _.partial(focus, 'reason');
    $scope.focusName   = _.partial(focus, 'name');
    $scope.focusCorp   = _.partial(focus, 'corp');

    $scope.step = {};

    $scope.doSingle = function() {
      var badge = new Badge({ printer: currentPrinter });
      badge.reason = $scope.step.reason;
      badge.name   = $scope.step.name;
      badge.corp   = $scope.step.corp;
      badge.$save(function() {
        $scope.step = {};
        $scope.focusReason();
      }, function(response) {
        $scope.error = response.data.err || response.data.error;
      });
    };
  });
