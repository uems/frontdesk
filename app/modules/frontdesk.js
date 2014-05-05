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
    'fd.steps.fillCountry',
    'fd.steps.fillDocument',
    'fd.steps.fillBadgeName',
    'fd.steps.fillBadgeCorp',
    'fd.steps.chooseCategory',
    'fd.steps.printBadge',
    'fd.steps.giveBadge',
    'fd.steps.payment',
    'fd.steps.paymentProof',
    'fd.steps.paymentPromocode',
    'fd.steps.done',
    'ui.router',
    'ui.router.compat',
    'templates',
    'ngAnimate'
  ])
  .controller('FrontdeskCtrl', function($scope) {
    $scope.$on('$stateChangeSuccess', function(event, newState) {
      $scope.topState = newState.name.split('.')[0];
      $scope.state    = newState;
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
