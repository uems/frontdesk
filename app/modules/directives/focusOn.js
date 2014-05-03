'use strict';

angular
  .module('fd.directives.focusOn', [])
  .directive('focusOn', function($timeout) {
    return function(scope, elem, attr) {
      scope.$on('focusOn', function(e, name) {
        if(name === attr.focusOn) {
          $timeout(function() {
            elem[0].focus();
          });
        }
      });
    };
  })
  .factory('focus', function ($rootScope, $timeout) {
    return function(name) {
      $timeout(function (){
        $rootScope.$broadcast('focusOn', name);
      });
    };
  });
