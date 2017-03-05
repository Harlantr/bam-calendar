angular.module('bamCalendar')
    .controller('calendarCtrl', ['$scope', '$compile', '$timeout', 'uiCalendarConfig',
        function($scope, $compile, $timeout, uiCalendarConfig){

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* event source that contains custom events on the scope */
    $scope.events = [
        {id: 'b294a687-c067-40f9-bf1a-968233655d6b',title: 'Event 1',start: new Date(y, m, 1), requestor: 'Thomas Harlan'},
        {id: '702c6fb6-f068-402d-9140-e25e2e67c702',title: 'Event 2',start: new Date(y, m, d), requestor: 'Thomas Harlan'},
        {id: '78bf15cf-fbb0-42b9-98f6-879d3c049861',title: 'Event 3',start: new Date(y, m, d+8), requestor: 'Thomas Harlan'},
        {id: 'ce0ca908-583d-4c6a-b414-55be2b5d8dc8',title: 'Event 4',start: new Date(y, m, 16), requestor: 'Thomas Harlan'},
        {id: 'e508b995-ac48-40db-afec-4196372b9367',title: 'Event 5',start: new Date(y, m, d), requestor: 'Thomas Harlan'},
    ];

    /* alert on eventClick */
    $scope.alertOnEventClick = function( event, jsEvent, view){
        $scope.chosenEvent = event;
    };

    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
        $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
    };

    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
        $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };

    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
        var canAdd = 0;
        angular.forEach(sources,function(value, key){
            if(sources[key] === source){
                sources.splice(key,1);
                canAdd = 1;
            }
        });
        if(canAdd === 0){
            sources.push(source);
        }
    };

    /* add custom event*/
    $scope.addEvent = function() {
        //Generate UUID (this will eventually be done server-side)
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
        $scope.events.push({
            id: uuid,
            title: $scope.newEventTitle,
            requestor: $scope.newEventRequestor,
            start: new Date(y, m, 28),
        });
    };

    /* remove event */
    $scope.remove = function(index) {
        $scope.events.splice(index,1);
    };

    /* Change View */
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
        element.attr({'tooltip': event.title,
                      'tooltip-append-to-body': true});
        $compile(element)($scope);
    };

    /* config object */
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

    /* event sources array*/
    $scope.eventSources = [$scope.events];
}]);