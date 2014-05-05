'use strict';

angular
  .module('fd.steps.fillDocument', [
    'fd.services.people',
    'fd.directives.focusOn',
    'fd.factories.lazyCommit',
    'ui.router',
    'ui.keypress',
    'ui.mask'
  ])
  .controller('FillDocumentCtrl', function($scope, $stateParams, $state, People, focus, lazyCommit) {
    var locator = { xid: $stateParams.xid };

    People.get(locator).$promise.then(function(person) {
      focus('document');

      $scope.commitDocument = function() {
        People.setDocument(locator, $scope.step, function() { $scope.reload('person'); });
      };

      $scope.step = {
        xid: $stateParams.xid,
        document: person.document
      };

      $scope.commitDocument = lazyCommit(People.setDocument, locator, 'person', person, $scope, 'document');
    });
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.fill_document', {
        url: '^/person/:xid/fill-document',
        views: {
          step: { controller: 'FillDocumentCtrl', templateUrl: 'modules/steps/fillDocument.html' }
        }
      });
  });
