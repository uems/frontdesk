'use strict';

function sPeople(strSearch, $http) {
    var promise = $http.get('scripts/test.json').then(function(response) {
        return {
            'results': response.data.results,
            'results_number': Object.keys(response.data.results).length
        };
    });
    return promise;
}