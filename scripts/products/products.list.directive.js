angular.module('tfApp').directive('productsList', function (productsFactory, ordersFactory) {

    function controller($filter, $scope, $routeParams) {
        $scope.updateOrderLine = updateOrderLine;
        $scope.incPosition = incPosition;
        $scope.decPosition = decPosition;
        updateScope();

        function updateScope() {

            productsFactory.get(new odataQuery()
                .filter("Categories/any(d:d/Id eq " + $routeParams.id + ")")
                .expand("Price,Categories")).then(function (answer) {
                    var products = answer.data.value;

                    ordersFactory.get(new odataQuery()
                        .filter("StatusCode eq 'DRAFT'")
                        .top(1)
                        .expand("Lines($expand=Item)")).then(function (answer) {
                            if (answer.data.value[0]) {
                                $scope.order = answer.data.value[0];
                                $scope.basket = generateBasket(products, $scope.order);
                            } else {
                                ordersFactory.save(getEmptyOrder()).then(function (answer) {
                                    $scope.order = answer.data;
                                    $scope.basket = generateBasket(products, $scope.order);
                                }, onError);
                            };
                    }, onError);
            }, onError);
        };

        function mapOrderToProducts(products, order) {
            return products.map(function (product) {
                var orderLine = findOrderLineByItemId(order.Lines, product.Id);

                product["orderLine"] = orderLine ?
                    orderLine : getEmptyOrderLine(product.Id, order.Id);

                product["incControlEnabled"] = true;
                product["decControlEnabled"] = true;
                return product;
            });
        };

        function generateBasket(products, order) {
            var basket = {};
            basket["products"] = mapOrderToProducts(products, order);
            basket["pickedCount"] = 0;

            for (var line in order.Lines) {
                basket["pickedCount"] += order.Lines[line].Qty;
            }

            return basket;
        };

        function getEmptyOrderLine(productId, orderId) {
            return {
                Qty: 0,
                ItemId: productId,
                OrderId: orderId,
            };
        };

        function incPosition(product) {
            $scope.basket.pickedCount++;
            product.orderLine.Qty++;
            product.incControlEnabled = false;
            updateOrderLine(product);
        };

        function decPosition(product) {
            $scope.basket.pickedCount--;
            product.orderLine.Qty--;
            product.decControlEnabled = false;
            updateOrderLine(product);
        };

        function updateOrderLine(product) {
            product.controlEnabled = false;
            if (product.orderLine.Qty == 0) {
                ordersFactory.deleteOrderLine(product.orderLine.Id).then(function (answer) {
                    product.orderLine = getEmptyOrderLine(product.Id, $scope.order.Id);
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

        

        function getEmptyOrder() {
            return {
                Date: new Date().toISOString(),
                DueDate: new Date().toISOString(),
                Number: "SO001",
                Type: "SO"
            };
        };

        function findOrderLineByItemId(lines, itemId) {
            for (var line in lines) {
                if (lines[line].ItemId === itemId) {
                    return lines[line];
                }
            }
            return null;
        }
    };

	return {
		restrict:"E",
		templateUrl: "scripts/products/products.list.template.html",
		scope:{
			disabled:"="
		},
		controller:controller
    };
});