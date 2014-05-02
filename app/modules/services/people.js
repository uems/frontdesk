'use strict';

angular
  .module('fd.services.people', [ 'ngResource' ])
  .service('People', function($resource) {
    var endpoint = 'http://localhost:2000/people/:xid';
    var paramDefaults = { xid: '@xid' };
    var actions = {
      'printBadge': { method: 'POST', url: endpoint+'/print-badge/:printer' }
    };
    return $resource(endpoint, paramDefaults, actions);
  });
