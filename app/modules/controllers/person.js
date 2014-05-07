/* global _ */
'use strict';

angular
  .module('fd.controllers.person', [
    'fd',
    'fd.controllers.search',
    'fd.services.people',
    'ui.router',
    'ui.gravatar',
    'ui.keypress',
    'ngAnimate'
  ])
  .controller('PersonMainCtrl', function($scope, $stateParams, $state, People) {
    function decideState() {
      var needsName     = !$scope.person.name;
      var needsDocument = !$scope.person.document;
      var needsEmail    = !$scope.person.email;
      var needsCountry  = !$scope.person.country;

      var needsData   = _([ needsName, needsDocument, needsEmail, needsCountry ]).any();
      var needsTicket = _($scope.person.validTickets).isEmpty();
      var needsPrint  = _($scope.person.badgePrinted).isEmpty() && _($scope.person.badgeMoved).isEmpty();

      if (needsData) {
        return 'person.fill_email';
      }
      else if (needsTicket) {
        return 'person.payment_pending';
      }
      else if (needsPrint) {
        return 'person.fill_badge_name';
      }
      else {
        return 'person.give_badge';
      }

    }

    $scope.demand = function(testObject, raise) {
      $scope.validState = false;
      var testPasses = (testObject === true) || (!_.isEmpty(testObject));
      if (testPasses) {
        $scope.validState = true;
      }
      else if (raise) {
        $scope.reload();
        throw 'invalid state';
      }
      else {
        $scope.reload();
      }
    };

    $scope.fastForward = function(nextState) {
      $state.go(nextState);
    };
    $scope.reload = function(nextState) {
      People.get({xid: $stateParams.xid}).$promise.then(function(person) {
        $scope.person = person;
        $scope.ticket = person.validTickets[0] || person.pendingTickets[0];
        $scope.hasValidTickets = !_(person.validTickets).isEmpty();
        $scope.isForeign = person.country !== 'Brasil';

        if (nextState === 'person') {
          $state.go('person');
        }
        else if ($state.is('person')) {
          $state.go(decideState());
        }
        else if (nextState) {
          $state.go(nextState);
        }
      });
    };

    $scope.reload();
  });
