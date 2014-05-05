'use strict';

angular
  .module('fd.steps.done', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('DoneCtrl', function($scope, $stateParams, $timeout) {
    $timeout(function() {
      $scope.fastForward('home');
    },5000);
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.done', {
        url: '^/person/:xid/done',
        views: {
          step: { controller: 'DoneCtrl', templateUrl: 'modules/steps/done.html' }
        }
      });
  });
