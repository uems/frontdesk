'use strict';

angular.module('templates', []);

angular
  .module('fd', [
    'fd.controllers.nav',
    'fd.controllers.home',
    'fd.controllers.search',
    'fd.controllers.person',
    'fd.steps.fillName',
    'fd.steps.fillEmail',
    'fd.steps.fillDocument',
    'ui.router',
    'templates',
    'ui.router.compat',
    'ngAnimate',
    'cfp.hotkeys',
    'chieffancypants.loadingBar'
  ])
  .controller('FrontdeskCtrl', function($scope) {
    $scope.$on('$stateChangeSuccess', function(event, newState) {
      $scope.topState  = newState.name.split('.')[0];
      $scope.fullState = newState.name;
    });
  })
  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  })
  .config(function(gravatarServiceProvider) {
    gravatarServiceProvider.defaults = {
      'default': 'identicon',
      'rating': 'pg'
    };
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '^/',
        views: {
          header: { controller: 'SearchCtrl', templateUrl: 'modules/views/search.html' },
          main:   { controller: 'HomeCtrl',   templateUrl: 'modules/views/home.html'   }
        }
      })
      .state('search', {
        url: '^/search/:query',
        views: {
          header: { controller: 'SearchCtrl', templateUrl: 'modules/views/search.html' },
          main:   { controller: 'SearchCtrl', templateUrl: 'modules/views/results.html' }
        },
      })
      .state('person', {
        url: '^/person/:xid',
        views: {
          header: { controller: 'NavCtrl',       templateUrl: 'modules/views/nav.html' },
          main:   { controller: 'PersonMainCtrl',templateUrl: 'modules/views/person.html' }
        }
      });
  });
