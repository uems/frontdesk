'use strict';

angular
  .module('fd.steps.fillEmail', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('FillEmailCtrl', function($scope, $stateParams, People, focus, lazyCommit) {
    var locator = { xid: $stateParams.xid };

   People.get(locator).$promise.then(function(person) {
      focus('email');

      $scope.step = {
        xid: $stateParams.xid,
        email: person.email
      };

      $scope.commitEmail = lazyCommit(People.setEmail, locator, 'person.fill_document', person, $scope, 'email');
    });
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.fill_email', {
        url: '^/person/:xid/fill-email',
        views: {
          step: { controller: 'FillEmailCtrl', templateUrl: 'modules/steps/fillEmail.html' }
        }
      });
  });
