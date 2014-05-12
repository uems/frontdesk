'use strict';

angular
  .module('fd.controllers.search', [
    'fd.services.people',
    'fd.directives.focusOn',
    'ui.router',
    'ui.gravatar',
    'ui.keypress',
    'ngAnimate'
  ])
  .config(function($stateProvider) {
    $stateProvider
      .state('search', {
        url: '^/search/:query',
        views: {
          header: { controller: 'SearchCtrl', templateUrl: 'modules/views/search.html' },
          main:   { controller: 'SearchCtrl', templateUrl: 'modules/views/results.html' }
        },
      });
  })
  .controller('SearchCtrl', function($scope, $state, $stateParams, People, focus) {
    focus('search');
    $scope.loading = true;

    function ready() {
      $scope.loading = false;
    }

    function moveFocus(diff) {
      return function(curr) {
        var max = $scope.results.length;
        var goTo = curr + diff;
        console.log(max, curr, goTo);
        if (goTo < 0)    { focus('search'); }
        if (goTo >= max) { focus('result-'+max); }
        else {
          focus('result-'+goTo);
        }
      };
    }

    $scope.validness = function(person) {
      return ((person.validTickets.length) * 10) +
             ((person.source === 'greve')  * 1);
    };

    $scope.doSearch = function() {
      if (!$scope.query) { return; }
      $state.go('search', { query: $scope.query });
    };

    $scope.focusSearch = function() {
      focus('search');
    };
    $scope.focusFirstResult = function() {
      if ($scope.results.length) {
        focus('result-0');
      }
    };

    $scope.home = function() {
      $state.go('home');
    };

    $scope.focusUp    = moveFocus(-2);
    $scope.focusDown  = moveFocus(+2);
    $scope.focusLeft  = moveFocus(-1);
    $scope.focusRight = moveFocus(+1);

    if ($stateParams.query) {
      $scope.query = $stateParams.query;
      $scope.results = People.query({ q: $scope.query }, ready);
    }
  });

