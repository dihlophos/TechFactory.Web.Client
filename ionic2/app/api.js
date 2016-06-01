import {Injectable} from '@angular/core';  

@Injectable()
export class Api {

    constructor() {
        this.categoriesCollectionUrl = "http://partner-web-api-v1.azurewebsites.net/odata/Categories";
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
}