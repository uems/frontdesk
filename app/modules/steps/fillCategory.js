/* global _ */
'use strict';

angular
  .module('fd.steps.fillCategory', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
  ])
  .controller('FillCategoryCtrl', function($scope, $stateParams, $state, People, focus, lazyCommit) {
    var locator = { xid: $stateParams.xid };

    $scope.categories = [ 'Estudante', 'Participante', 'Caravaneiro' ];
    $scope.prices = _.chain($scope.categories).zip([150,300,150]).object().value();
    console.log($scope.prices);

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
      .state('person.fill_category', {
        url: '^/person/:xid/fill-category',
        views: {
          step: { controller: 'FillCategoryCtrl', templateUrl: 'modules/steps/fillCategory.html' }
        }
      });
  });
