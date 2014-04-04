'use strict';

angular.module('frontdeskApp')
  .directive('uPersonListing', function () {
    return {
      templateUrl: 'views/uPersonListing.html',
      scope: {
        person: '='
      },
      restrict: 'E'
    }
  });
