var todo = angular.module('todo', []);

todo.controller('mainController', ['$scope', '$http', function($scope, $http) {
    $scope.formData = {};

    //Reset headers to avoid OPTIONS request (aka preflight)
    $http.defaults.headers.common = {};
    $http.defaults.headers.post = {};
    $http.defaults.headers.put = {};
    $http.defaults.headers.patch = {};

    // Get all todos and show them
    loadData()

    // Add a new todo
    $scope.createTodo = function() {
        $http.post('http://localhost:8081/todos', $scope.formData)
        .then(
            function success(response) {
                loadData();
            }, function error(response) {
                console.log('Error: ' + response.data);
            });
        $scope.formData = {}; // clear the form so our user is ready to enter another
    };

    // Delete a todo
    $scope.deleteTodo = function(id) {
        $http.delete('http://localhost:8081/todos/' + id)
        .then(
            function success(response) {
                loadData();
            }, function error(response) {
                console.log('Error: ' + response.data);
            });
    };

    // Load data from server
    function loadData(){
        $http.get('http://localhost:8081/todos')
        .then(
            function success(response) {
                $scope.todos = response.data;
            }, function error(response) {
                //Swallow that shit.
            });
    };
}]);