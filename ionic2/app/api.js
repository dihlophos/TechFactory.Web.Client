import {Injectable} from '@angular/core';  

@Injectable()
export class Api {

    constructor() {
        this.categoriesCollectionUrl = "http://partner-web-api-v1.azurewebsites.net/odata/Categories";
        this.productsCollectionUrl = "http://partner-web-api-v1.azurewebsites.net/odata/Products";
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
}