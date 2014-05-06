'use strict';

angular
  .module('fd.steps.fillCity', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('FillCityCtrl', function($scope, $state, People, person, focus, lazyCommit) {
    var locator = { xid: person.xid };

    $scope.step = {
      xid: person.xid,
      city: person.city
    };

    focus('city');

    $scope.commitCity = lazyCommit(People.setCity, locator, 'person.fill_document', person, $scope, 'city');
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.fill_city', {
        url: '^/person/:xid/fill-city',
        resolve: {
          person: function(People, $stateParams) { return People.get({ xid: $stateParams.xid }).$promise; }
        },
        views: {
          step: { controller: 'FillCityCtrl', templateUrl: 'modules/steps/fillCity.html' }
        }
      });
  });
