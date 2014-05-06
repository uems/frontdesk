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
  .controller('FillDocumentCtrl', function($scope, $state, People, person, focus, lazyCommit) {
    var locator = { xid: person.xid };
    $scope.step = { xid: person.xid, document: person.document };

    focus('document');

    $scope.commitDocument = lazyCommit(People.setDocument, locator, 'person.fill_gender', person, $scope, 'document');
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('person.fill_document', {
        url: '^/person/:xid/fill-document',
        resolve: {
          person: function(People, $stateParams) { return People.get({ xid: $stateParams.xid }).$promise; }
        },
        views: {
          step: { controller: 'FillDocumentCtrl', templateUrl: 'modules/steps/fillDocument.html' }
        }
      });
  });
