'use strict';

angular
  .module('fd.factories.lazyCommit', [])
  .factory('lazyCommit', function() {
    return function(commitFn, locator, nextState, oldEntry, scope, field) {
      return function() {
        console.log(scope.step[field], oldEntry[field]);
        if (scope.step[field] === oldEntry[field]) {
          console.log('no changes for field '+field+', so I will be lazy');
          scope.fastForward(nextState);
        }
        else {
          console.log('commiting changes on ', field);
          commitFn(locator, scope.step, function() { scope.reload(nextState); });
        }
      };
    };
  });
