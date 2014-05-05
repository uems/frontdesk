'use strict';

angular
  .module('fd.steps.fillName', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('FillNameCtrl', function($scope, $state, People, person, focus, lazyCommit) {
    var locator = { xid: person.xid };

    focus('name');

    $scope.step = {
      xid: person.xid,
      name: person.name
    };

    $scope.commitName = lazyCommit(People.setName, locator, 'person.fill_country', person, $scope, 'name');
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.fill_name', {
        url: '^/person/:xid/fill-name',
        resolve: {
          person: function(People, $stateParams) { return People.get({ xid: $stateParams.xid }).$promise; }
        },
        views: {
          step: { controller: 'FillNameCtrl', templateUrl: 'modules/steps/fillName.html' }
        }
      });
  });
