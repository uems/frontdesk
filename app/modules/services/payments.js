'use strict';

angular
  .module('fd.services.payments', [ 'ngResource', 'fd.config' ])
  .service('Payments', function($resource, GatewayHost) {
    var endpoint = GatewayHost+'/payments/:ip';
    var paramDefaults = { };
    var actions = { };

    return $resource(endpoint, paramDefaults, actions);
  });
