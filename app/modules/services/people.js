'use strict';

angular
  .module('fd.services.people', [ 'ngResource' ])
  .service('People', function($resource) {
    var endpoint = 'http://localhost:2000/people/:xid';
    var paramDefaults = { xid: '@xid', printer: '@printer' };
    var actions = {
      'printBadge':   { method: 'POST', url: endpoint+'/print-badge/:printer' },
      'setName':      { method: 'POST', url: endpoint+'/set-name' },
      'setEmail':     { method: 'POST', url: endpoint+'/set-email' },
      'setDocument':  { method: 'POST', url: endpoint+'/set-document' },
      'setBadgeName': { method: 'POST', url: endpoint+'/set-badge-name' },
      'setBadgeCorp': { method: 'POST', url: endpoint+'/set-badge-corp' },
      'setCountry':   { method: 'POST', url: endpoint+'/set-country' }
    };
    return $resource(endpoint, paramDefaults, actions);
  });
