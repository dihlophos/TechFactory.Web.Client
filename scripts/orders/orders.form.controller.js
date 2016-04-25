angular.module('tfApp').controller('ordersFormController', function ($scope, $routeParams, ordersFactory) {

    updateScope();

    function updateScope() {
        ordersFactory.getOrderLines($routeParams.id)
            .then(function (answer) {
                $scope.orderLines = answer.data.value;
                $scope.orderLines.forEach((orderLine, idx, orderLines) => {
                    ordersFactory.getItem(orderLine.Id)
                        .then(function (answer) {
                            $scope.orderLines[idx]["productName"] = answer.data.Name;
                        }, onError);
                });
            }, onError);

        for (var itemIdx in $scope.items) {
            ordersFactory.getItem($scope.items[itemIdx].Id)
                .then(function (answer) {
                    $scope.items[itemIdx]["productName"] = answer.data.Name;
                }, onError);
        };
    };

    function onError(answer) {
        alert("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
    };
});