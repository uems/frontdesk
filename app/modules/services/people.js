'use strict';

angular
  .module('fd.services.people', [ 'ngResource' ])
  .service('People', function($resource) {
    var endpoint = 'http://localhost:3000/people/:xid';
    return $resource(endpoint);
  });
