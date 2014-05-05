'use strict';

angular
  .module('fd.steps.fillEmail', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('FillEmailCtrl', function($scope, People, person, focus, lazyCommit) {
    var locator = { xid: person.xid };
    $scope.step = { xid: person.xid, email: person.email };

    focus('email');

    $scope.cancel = function() { $scope.step = person.email; };

    $scope.commitEmail = lazyCommit(People.setEmail, locator, 'person.fill_name', person, $scope, 'email');
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.fill_email', {
        url: '^/person/:xid/fill-email',
        resolve: {
          person: function(People, $stateParams) { return People.get({ xid: $stateParams.xid }).$promise; }
        },
        views: {
          step: { controller: 'FillEmailCtrl', templateUrl: 'modules/steps/fillEmail.html' }
        }
      });
  });
