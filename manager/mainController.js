angular.module('tfManagerApp').controller('mainController', function ($scope, $routeParams, $anchorScroll, productsFactory, categoriesFactory) {

    updateScope();

    function updateScope() {
        categoriesFactory.get()
            .then(function (answer) {
                $scope.categories = answer.data.value;
            }, onError);

        productsFactory.get()
            .then(function (answer) {
                    $scope.products = answer.data.value;
                }, onError);
    };

    $scope.pickCategory = function(category) {
        $scope.currentCategory=category;
    };

    $scope.pickProduct = function(product) {
        $scope.currentProduct=product;
    };

    $scope.updateCategory = function(category) {
        if ($scope.categoryForm.$valid) {
            categoriesFactory.save(category)
            .then(function (answer) {
                    console.log('Category updated');
                    updateScope();
                }, onError);
        } else {
            updateScope();
        }
    };

    $scope.updateProduct = function(product) {
        if ($scope.productForm.$valid) {
            productsFactory.save(product)
                .then(function (answer) {
                        console.log('Product updated');
                        updateScope();
                    }, onError);
        } else {
            updateScope();
        }
    };

    $scope.deleteCategory = function(category) {
        categoriesFactory.del(category.Id)
            .then(function (answer) {
                    console.log('Category deleted');
                    updateScope();
                }, onError);
    };

    $scope.deleteProduct = function(product) {
        productsFactory.del(product.Id)
            .then(function (answer) {
                    console.log('Product deleted');
                    updateScope();
                }, onError);
    };

    $scope.addCategory = function() {
        categoriesFactory.save({Name:"NewCategory", Key:"NewCategory"})
            .then(function (answer) {
                    console.log('Category created');
                    $scope.currentCategory = answer.data;
                    updateScope();
                }, onError);
    };

    $scope.addProduct = function() {
        productsFactory.save({Name:"NewProduct", Key:"NewProduct", Type:"Type"})
            .then(function (answer) {
                    console.log('Product created');
                    $scope.currentProduct = answer.data;
                    updateScope();
                }, onError);
    };


    function onError(answer) {
        alert("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
    };
});