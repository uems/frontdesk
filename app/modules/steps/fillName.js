'use strict';

angular
  .module('fd.steps.fillName', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('FillNameCtrl', function($scope, $stateParams, $state, People, focus, lazyCommit) {
    var locator = { xid: $stateParams.xid };

    People.get(locator).$promise.then(function(person) {
      focus('name');

      $scope.step = {
        xid: $stateParams.xid,
        name: person.name
      };

      $scope.commitName = lazyCommit(People.setName, locator, 'person.fill_country', person, $scope, 'name');
    });
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.fill_name', {
        url: '^/person/:xid/fill-name',
        views: {
          step: { controller: 'FillNameCtrl', templateUrl: 'modules/steps/fillName.html' }
        }
      });
  });
