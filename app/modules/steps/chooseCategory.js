/* global _ */
'use strict';

angular
  .module('fd.steps.chooseCategory', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('ChooseCategoryCtrl', function($scope, $stateParams, $state, People, focus, lazyCommit) {
    var locator = { xid: $stateParams.xid };

    $scope.categories = [ 'Participante', 'Estudante', 'Caravaneiro' ];
    $scope.prices = _.chain($scope.categories).zip([300,150,150]).object().value();

    $scope.selectCategory = function(ev, index) {
      $scope.step.category = $scope.categories[index];
      $scope.commitCategory();
    };

    $scope.focusPrev = function(current) {
      if (current === 0) { return; }
      focus('category-'+(current-1));
    };
    $scope.focusNext = function(current) {
      if (current === $scope.categories.length) { return; }
      focus('category-'+(current+1));
    };

    People.get(locator).$promise.then(function(person) {
      var index = Math.max($scope.categories.indexOf(person.category), 0);
      focus('category-'+index);

      $scope.step = {
        xid: $stateParams.xid,
        category: person.category,
      };

      $scope.commitCategory = lazyCommit(People.setCategory, locator, 'person.give_badge', person, $scope, 'category');
    });
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.choose_category', {
        url: '^/person/:xid/choose-category',
        views: {
          step: { controller: 'ChooseCategoryCtrl', templateUrl: 'modules/steps/chooseCategory.html' }
        }
      });
  });