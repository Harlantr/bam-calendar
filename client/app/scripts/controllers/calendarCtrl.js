angular.module('bamCalendar')
    .controller('calendarCtrl', ['$scope', '$compile', '$timeout', 'uiCalendarConfig', 'dataFactory',
        function($scope, $compile, $timeout, uiCalendarConfig, dataFactory){

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

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
    $scope.addEvent = function(isValid) {
        if(isValid){
            //Generate UUID (this will eventually be done server-side)
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
            $scope.events.push({
                id: uuid,
                title: $scope.newEventTitle,
                requestor: $scope.newEventRequestor,
                start: new Date(y, m, 28),
            });

            //Clear Form
            $scope.newEventTitle = ''
            $scope.newEventRequestor = ''
            $scope.newEventDueDate = ''

        }else{
            alert('bad.')
        }
        console.log($scope.events);
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

    // Load data from server
    function loadEvents(){
        dataFactory.getEvents()
        .then(
            function success(response) {
                for (var i = 0; i < response.data.length; i++) {
                    $scope.events.push(response.data[i]);
                }
            }, function error(response) {
                //Swallow that shit.
            });
    };

    $scope.events = [];
    $scope.eventSources = [$scope.events];
    loadEvents();
}]);