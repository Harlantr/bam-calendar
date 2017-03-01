var bamCalendar = angular.module('bamCalendar', ['ngRoute', 'ui.calendar']);

bamCalendar.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        controller: 'calendarCtrl',
        templateUrl: 'views/calendar.html'
    })
    .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
}]);
