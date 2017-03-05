angular.module('bamCalendar')
    .controller('calendarCtrl', ['$scope', '$compile', '$timeout', 'uiCalendarConfig', 'dataFactory',
        function($scope, $compile, $timeout, uiCalendarConfig, dataFactory){

    // "New Event" form object
    $scope.newEventFormData = {};


    /* On click */
    $scope.alertOnEventClick = function( event, jsEvent, view){
        $scope.chosenEvent = event;
    };

    /* On drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
        $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
    };

    /* Add custom event*/
    $scope.addEvent = function(isValid) {
        if(isValid){
            $scope.newEventFormData.start = new Date(y, m, d);  //Temporary, until I get date picker working

            //Save new event
            dataFactory.addEvent($scope.newEventFormData)
            .then(
                function success(response){
                    loadEvents()
                },
                function error(response){
                    alert("Error storing data");
                });

            //Clear form object
            $scope.newEventFormData = {}
        }
    };

    /* Remove event */
    $scope.remove = function(index) {
        $scope.events.splice(index,1);
    };

    /* Change View (Day/Week/Month) */
    $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };

    /* Change View */
    $scope.renderCalendar = function(calendar) {
        $timeout(function() {
            if(uiCalendarConfig.calendars[calendar]){
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
        });
    };

     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element[0].setAttribute('title', event.title);
    };

    /* Config */
    $scope.uiConfig = {
        calendar:{
            height: 550,
            editable: true,
            header:{
                left: 'title',
                center: '',
                right: 'today prev,next'
            },
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRender
        }
    };

    // Load event data
    function loadEvents(){
        dataFactory.getEvents()
        .then(
            function success(response) {
                for (var i = 0; i < response.data.length; i++) {
                    $scope.events.push(response.data[i]);
                }
            }, function error(response) {
                alert("Error retrieving data");
            });
    };

    // Set defaults
    $scope.events = [];
    $scope.eventSources = [$scope.events];
    loadEvents();
}]);