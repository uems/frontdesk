'use strict';

angular.module('templates', []);

angular
  .module('fd', [
    'fd.controllers.home',
    'fd.controllers.search',
    'fd.controllers.person',
    'ui.router',
    'templates',
    'ui.router.compat',
    'ngAnimate',
    'cfp.hotkeys'
  ])
  .controller('FrontdeskCtrl', function($scope) {
    $scope.$on('$stateChangeSuccess', function(event, newState) {
      $scope.state = newState;
      console.log($scope.state);
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
      .state('detail', {
        url: '^/person/:xid',
        views: {
          header: { controller: 'PersonCtrl', template: '<button ng-click="back()">voltar</button>' },
          main:   { controller: 'PersonCtrl', templateUrl: 'modules/views/person.html' }
        }
      });
  });
