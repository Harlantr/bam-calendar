angular.module('bamCalendar')
    .factory('dataFactory', ['$http', function($http) {

    var dataFactory = {};

    //Reset headers to avoid OPTIONS request (aka preflight)
    $http.defaults.headers.common = {};
    $http.defaults.headers.post = {};
    $http.defaults.headers.put = {};
    $http.defaults.headers.patch = {};

    dataFactory.getEvents = function () {
        return $http.get('http://localhost:8081/events');
    };

    return dataFactory;
}]);