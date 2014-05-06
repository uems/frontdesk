'use strict';

angular
  .module('fd.services.people', [ 'ngResource', 'fd.config' ])
  .service('People', function($resource, GatewayHost) {
    var endpoint = GatewayHost+'/people/:xid';
    var paramDefaults = { xid: '@xid', printer: '@printer' };
    var actions = {
      'printBoth':     { method: 'POST', url: endpoint+'/print-both/:printer' },
      'setName':       { method: 'POST', url: endpoint+'/set-name' },
      'setEmail':      { method: 'POST', url: endpoint+'/set-email' },
      'setDocument':   { method: 'POST', url: endpoint+'/set-document' },
      'setBadgeName':  { method: 'POST', url: endpoint+'/set-badge-name' },
      'setBadgeCorp':  { method: 'POST', url: endpoint+'/set-badge-corp' },
      'setCountry':    { method: 'POST', url: endpoint+'/set-country' },
      'setCity':       { method: 'POST', url: endpoint+'/set-city' },
      'setGender':     { method: 'POST', url: endpoint+'/set-gender' },
      'setCategory':   { method: 'POST', url: endpoint+'/set-category' },
      'giveBadge':     { method: 'POST', url: endpoint+'/give-badge' },
      'acceptProof':   { method: 'POST', url: endpoint+'/accept-proof' },
      'acceptMoney':   { method: 'POST', url: endpoint+'/accept-money' },
      'applyPromocode':{ method: 'POST', url: endpoint+'/apply-promocode' }
    };

    return $resource(endpoint, paramDefaults, actions);
  });
