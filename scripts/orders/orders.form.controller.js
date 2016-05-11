angular.module('tfApp').controller('ordersFormController', function ($scope, $routeParams, ordersFactory) {

    updateScope();
    $scope.confirm = confirm;

    function updateScope() {
        ordersFactory.get(new odataQuery($routeParams.id)
            .expand("Lines($expand = Item)"))
            .then(function (answer) {
                $scope.order = answer.data;
            }, onError);
    };

    function confirm() {
        ordersFactory.confirm($scope.order)
            .then(function (answer) {
                location.href="#/"
            }, onError);
    }

    function onError(answer) {
        alert("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
    };
});