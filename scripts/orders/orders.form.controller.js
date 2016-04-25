angular.module('tfApp').controller('ordersFormController', function ($scope, $routeParams, ordersFactory) {

    updateScope();

    function updateScope() {
        ordersFactory.getById($routeParams.id)
            .then(function (answer) {
                $scope.order = answer.data;
            }, onError);
    };

    function onError(answer) {
        alert("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
    };
});