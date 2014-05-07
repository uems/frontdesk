'use strict';

angular
  .module('fd.services.badge', [ 'ngResource', 'fd.config' ])
  .service('Badge', function($resource, GatewayHost) {
    var endpoint = GatewayHost+'/badge/:printer';
    var paramDefaults = { printer: '@printer' };

    return $resource(endpoint, paramDefaults);
  });
