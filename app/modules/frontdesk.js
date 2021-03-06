'use strict';

angular.module('templates', []);

angular
  .module('fd', [
    'fd.controllers.nav',
    'fd.controllers.home',
    'fd.controllers.search',
    'fd.controllers.person',
    'fd.controllers.create',
    'fd.controllers.single',
    'fd.controllers.payments',
    'fd.controllers.printer',
    'fd.steps.fillName',
    'fd.steps.fillEmail',
    'fd.steps.fillCountry',
    'fd.steps.fillCity',
    'fd.steps.fillDocument',
    'fd.steps.fillBadgeName',
    'fd.steps.fillBadgeCorp',
    'fd.steps.chooseGender',
    'fd.steps.chooseCategory',
    'fd.steps.printBadge',
    'fd.steps.giveBadge',
    'fd.steps.paymentPending',
    'fd.steps.paymentProof',
    'fd.steps.paymentMoney',
    'fd.steps.paymentPromocode',
    'fd.steps.done',
    'fd.services.badge',
    'fd.services.flash',
    'fd.services.currentPrinter',
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
  });
