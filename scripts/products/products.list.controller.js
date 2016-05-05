angular.module('tfApp').controller('productsListController', function (productsFactory, ordersFactory, $filter, $scope) {

        $scope.updateOrderLine = updateOrderLine;
        $scope.incPosition = incPosition;
        $scope.decPosition = decPosition;
        updateScope();        

        function updateScope() {
            ordersFactory.save({
                Amount: '10',
                BaseAmount: '10',
                Date: new Date().toISOString(),
                DueDate: new Date().toISOString(),
                SourceId: "8ddcf8e9-7c89-4253-879a-16b52e598f65",
                DestinationId: "8ddcf8e9-7c89-4253-879a-16b52e598f65",
                CurrencyId: '8ddcf8e9-7c89-4253-879a-16b52e598f65',
                CustomerId: '8ddcf8e9-7c89-4253-879a-16b52e598f65',
                LinesCount: '5',
                Number: "SO001",
                Type: "SO"
            }).then(function (answer) {
                $scope.order = answer.data;
                productsFactory.get().then(function (answer) {
                    var products = answer.data.value;
                    $scope.basket = products.map(function (product) {
                        product["orderLine"] = mockOrderLine(product.Id);
                        product["incControlEnabled"] = true;
                        product["decControlEnabled"] = true;
                        return product;
                    });
                    $scope.basket["pickedCount"] = 0;
                }, onError);
            }, onError);
        };
        
        function incPosition(product) {
            $scope.basket.pickedCount++;
            product.orderLine.Qty++;
            product.incControlEnabled = false;
            updateOrderLine(product);
        }

        function decPosition(product) {
            $scope.basket.pickedCount--;
            product.orderLine.Qty--;
            product.decControlEnabled = false;
            updateOrderLine(product);
        }

        function updateOrderLine(product) {
            product.controlEnabled = false;
            if (product.orderLine.Qty == 0) {
                ordersFactory.deleteOrderLine(product.orderLine.Id).then(function (answer) {
                    product.orderLine = mockOrderLine(product.Id);
                    product.incControlEnabled = true;
                    product.decControlEnabled = true;
                }, onError);
            }
            else {
                ordersFactory.saveOrderLine(product.orderLine).then(function (answer) {
                    if (answer.data)//PUT returns status 204((
                    {
                        product.orderLine = answer.data;
                    };
                    product.incControlEnabled = true;
                    product.decControlEnabled = true;
                }, onError);
            }
        };

        function onError(answer) {
            alert("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
            product.incControlEnabled = true;
            product.decControlEnabled = true;
        };

        function mockOrderLine(productId) {
            return {
                Amount: 0,
                BaseQty: 1,
                Qty: 0,
                ItemId: productId,
                OrderId: $scope.order.Id,
                Priority: 1,
                UomId: "8ddcf8e9-7c89-4253-879a-16b52e598f65"
            };
        }
});
