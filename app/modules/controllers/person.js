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
    $scope.printBadge = function() {
      function handleError(response) {
        console.log(response.data);
      }
      function handleSuccess() {
        console.log(arguments);
      }
      var xid = $scope.person.xid;
      People.printBadge({ xid: xid, printer: 1 }, {}, handleSuccess, handleError);
    };
    $scope.person = People.get({xid: $stateParams.xid});
  });
