import {Injectable} from '@angular/core';  

require('es6-promise').polyfill();
require('isomorphic-fetch');

@Injectable()
export class Api {

    constructor() {
        this.categoriesCollectionUrl = "http://partner-web-api-v1.azurewebsites.net/odata/Categories";
        this.productsCollectionUrl = "http://partner-web-api-v1.azurewebsites.net/odata/Products";
        this.basket = {
            items : []
        }
    }
    
    getCategoryById(id) {
        return fetch(this.categoriesCollectionUrl + '(' + id + ')/&$expand=Links')
            .then((response) => { return response.json()})
            .then((json) => { return json});
    }
    
    getCategoryByKey(key) {
        return fetch(this.categoriesCollectionUrl + '/?$filter=Key eq \'' + key + '\'&$expand=Links')
            .then((response) => { return response.json()})
            .then((json) => { return json.value[0]});
    }
    
    getCategoriesByParentId(id) {
        return fetch(this.categoriesCollectionUrl + '/?$filter=ParentId eq ' + id + '&$expand=Links')
            .then((response) => { return response.json()})
            .then((json) => { return json.value});
    }
    
    getCategoriesByParentKey(key) {
        return this.getCategoryByKey(key)
            .then((data) => { 
                return this.getCategoriesByParentId(data.Id);
            });
    }
    
    getProductById(id){
        return fetch(this.productsCollectionUrl + '(' + id + ')/?$expand=Price,Categories,Links,Ingredients($expand=Child,ChildUom)')
            .then((response) => { return response.json()})
            .then((json) => { return json.value});
    }
    
    getProductsByCategoryId(id){
        return fetch(this.productsCollectionUrl + '/?$filter=Categories/any(d:d/Id eq ' + id + ')&$expand=Price,Categories,Links,Ingredients($expand=Child,ChildUom)')
            .then((response) => { return response.json()})
            .then((json) => { return json.value});
    }

    getBasket(){
        console.log(this.basket);
    }

    addItemToBasket(item){
        console.log(item);

        if (!(item in this.basket.items)){
            this.basket.items.push(item);
            this.basket.items[item] = 1;
        } else{
            this.basket.items[item]++;
        }
        
        console.log(this.basket);
    }
}