angular.module('tfApp').controller('ordersListController', function (ordersFactory, $scope) {

    $scope.formatDate = formatDate;

    updateScope();

    function updateScope() {
        ordersFactory.get((new odataQuery()).filter("StatusCode ne 'DRAFT'"))
            .then(function (answer) {
                $scope.orders = answer.data.value;
            }, onError);
    };

    function onError(answer) {
        alert("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
    };
});