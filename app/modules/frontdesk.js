'use strict';

angular.module('templates', []);

angular
  .module('fd', [
    'fd.search',
    'ui.router',
    'ui.gravatar',
    'ui.keypress',
    'templates'
  ])
  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  })
  .config(function(gravatarServiceProvider) {
    gravatarServiceProvider.defaults = {
      'default': 'identicon',
      'rating': 'pg'
    };
  });
