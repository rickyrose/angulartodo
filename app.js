var todomvc = angular.module('todomvc', ['firebase']);

todomvc.controller('TodoCtrl', function TodoCtrl($scope, $location, $firebase){
    var fireRef = new $firebase('database');
    $scope.todos = $firebase(fireRef).$asArray();
    $scope.newTodo = '';
    $scope.editedTodo = null;

    $scope.$watch('todos', function(){
        var total = 0;
        var remaining = 0;
        var completed = 0;
        var deleted = 0;
        $scope.todos.forEach(function(todo){
            total++;
            if (todo.completed === false){
                remaining++;
            }
        });
        $scope.totalCount = total
        $scope.remainingCount = remaining;
        $scope.totalCompleted = completed
        $scope.totalDeleted = deleted
        $scope.allchecked = remaining === 0;
    }, true);

    $scope.addTodo = function(){
        var newTodo = $scope.newTodo.trim();
        if (!newTodo.length){
            return;
        }
        // add to firebase
        $scope.todos.add({
            title: newTodo,
            completed: false,
            deleted: false

        });
        $scope.newTodo = '';
    };

    $scope.editTodo = function(todo){
        $scope.editedTodo = todo;
        $scope.originalTodo = angular.extend({}, $scope.editedTodo);
    };

    // update todo
    $scope.doneEditing = function(todo){
        $scope.editedTodo = null;
        var title = todo.title.trim();
        if (title) {
            $scope.todos.$save(todo);

        }else{
            $scope.removeTodo(todo);
        }
    };

    $scope.removeTodo = function(todo){
        $scope.tofos.$remove(todo);
    };
    // delete completed
    $scope.clearCompletedTodos = function(){
        angular.forEach($scope.todos, function(todos){
            if(todo.completed){
                $scope.todos.$remove(todo);
            }
        });
    };

    //toggle completetion status of all todos
    $scope.markAll = function(allCompleted){
        console.log(allCompleted)
        angular.forEach($scope.todos, function(todo){
            todo.completed = allCompleted;
            console.log(todo)
            $scope.todos.$save(todo);
        });
    };

    $scope.markAll = function(allDeleted){
        console.log(allDeleted)
        angular.forEach($scope.todos, function(todo){
            todo.deleted = allDeleted;
            console.log(todo)
            $scope.todos.$save(todo);
        });
    };
})

todomvc.directive('todoFocus', function todoFocus ($timeout){
    return function(scope, elem, attrs){
        scope.$watch(attrs.tofoFocus, function(newVal){
            if (newVal){
                $timeout(function(){
                    //sets focus for edit
                    elem[0].focus();
                })
            }
        })
    }
})