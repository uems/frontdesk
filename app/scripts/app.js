'use strict';

angular
  .module('frontdeskApp', [ 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ui.router' ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
  });
