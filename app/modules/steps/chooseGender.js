'use strict';

angular
  .module('fd.steps.chooseGender', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('ChooseGenderCtrl', function($scope, $state, People, person, focus, lazyCommit) {
    var locator = { xid: person.xid };

    $scope.step = {
      xid: person.xid,
      gender: person.gender,
    };
    
    $scope.genders = [ 'Masculino', 'Feminino' ];
    $scope.gendersValues = [ 'masculino', 'feminino' ];

    $scope.selectGender = function(ev, index) {
      $scope.step.gender = $scope.gendersValues[index];
      $scope.commitGender();
    };

    $scope.focusPrev = function(current) {
      if (current === 0) { return; }
      focus('gender-'+(current-1));
    };
    $scope.focusNext = function(current) {
      if (current === $scope.genders.length) { return; }
      focus('gender-'+(current+1));
    };

    var currentGender = $scope.gendersValues.indexOf(person.gender);
    focus('gender-' + currentGender);
    
    $scope.commitGender = lazyCommit(People.setGender, locator, 'person.payment_pending', person, $scope, 'gender');
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.choose_gender', {
        url: '^/person/:xid/choose-gender',
        resolve: {
          person: function(People, $stateParams) { return People.get({ xid: $stateParams.xid }).$promise; }
        },
        views: {
          step: { controller: 'ChooseGenderCtrl', templateUrl: 'modules/steps/chooseGender.html' }
        }
      });
  });
