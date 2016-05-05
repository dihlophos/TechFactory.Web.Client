angular.module('tfApp').controller('productsListController', function (productsFactory, ordersFactory, $filter, $scope, $routeParams) {
        $scope.updateOrderLine = updateOrderLine;
        $scope.incPosition = incPosition;
        $scope.decPosition = decPosition;
        updateScope();        

        function updateScope() {
            ordersFactory.save({
                Date: new Date().toISOString(),
                DueDate: new Date().toISOString(),
                Number: "SO001",
                Type: "SO"
            }).then(function (answer) {
                $scope.order = answer.data;
                if ($routeParams.catid) {
                    productsFactory.getByCategoryId($routeParams.catid).then(function (answer) {
                        var products = answer.data.value;
                        $scope.basket = products.map(function (product) {
                            product["orderLine"] = mockOrderLine(product.Id);
                            product["incControlEnabled"] = true;
                            product["decControlEnabled"] = true;
                            return product;
                        });
                        $scope.basket["pickedCount"] = 0;
                    }, onError);
                }
                else {
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
                }
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
                Qty: 0,
                ItemId: productId,
                OrderId: $scope.order.Id,
            };
        }
});
