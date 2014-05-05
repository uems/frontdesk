'use strict';

angular
  .module('fd.steps.fillCountry', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('FillCountryCtrl', function($scope, $state, People, person, focus, lazyCommit) {
    var locator = { xid: person.xid };
    $scope.step = { xid: person.xid, country: person.country };

    $scope.countries = ['Brasil', 'Uruguai', 'Argentina' ];

    $scope.selectCountry = function(ev, index) {
      var countries = $scope.countries.concat($scope.enteredCountry);
      $scope.step.country = countries[index];
      $scope.commitCountry();
    };

    $scope.focusPrev = function(current) {
      if (current === 0) { return; }
      focus('country-'+(current-1));
    };
    $scope.focusNext = function(current) {
      if (current === $scope.countries.length) { return; }
      focus('country-'+(current+1));
    };

    $scope.commitCountry = lazyCommit(People.setCountry, locator, 'person.fill_document', person, $scope, 'country');

    var index = $scope.countries.indexOf(person.country);
    if ((index < 0) && (person.country)) {
      index = $scope.countries.length;
      $scope.enteredCountry = person.country;
    }
    else if (!person.country) {
      index = 0;
    }

    focus('country-'+index);

  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.fill_country', {
        url: '^/person/:xid/fill-country',
        resolve: {
          person: function(People, $stateParams) { return People.get({ xid: $stateParams.xid }).$promise; }
        },
        views: {
          step: { controller: 'FillCountryCtrl', templateUrl: 'modules/steps/fillCountry.html' }
        }
      });
  });
