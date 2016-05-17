angular.module('tfApp').controller('ordersFormController', function ($scope, $routeParams, ordersFactory) {

    updateScope();
    $scope.confirm = confirm;
    $scope.qr = "https://chart.googleapis.com/chart?cht=qr&chs=255x255&chl=";

    function updateScope() {
        ordersFactory.get(new odataQuery($routeParams.id)
            .expand("Lines($expand = Item)"))
            .then(function (answer) {
                $scope.order = answer.data;
                $scope.qr += answer.data.id;
            }, onError);
    };

    function confirm() {
        ordersFactory.confirm($scope.order)
            .then(function (answer) {
                location.href="#/orders/"
            }, onError);
    }

    $scope.removeOrderLine = function (line) {
        ordersFactory.deleteOrderLine(line.Id).then(function (answer) {
            updateScope();
            $scope.$emit('DRAFT_ORDER_ID', $scope.order.Id);
        }, onError);
    };

    function onError(answer) {
        alert("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
    };
});