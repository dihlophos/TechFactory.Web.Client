import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ApiService {

    private categoriesCollectionUrl: string = 'http://partner-web-api-v1.azurewebsites.net/odata/Categories';
    private productsCollectionUrl: string = 'http://partner-web-api-v1.azurewebsites.net/odata/Products';

    constructor(private http: Http) {
        //this.basket = {
        //    items: []
        //}
    }

    getRepos(username) {
        let repos = this.http.get(`https://api.github.com/users/${username}/repos`);
        return repos;
    }

    getCategoryByKey(key) {
        return this.http.get(this.categoriesCollectionUrl + '/?$filter=Key eq \'' + key + '\'&$expand=Links')
            .map(response => { return response.json() })
            .map(json => { return json.value[0] });
    }

    getCategoriesByParentId(id) {
        return this.http.get(this.categoriesCollectionUrl + '/?$filter=ParentId eq ' + id + '&$expand=Links')
            .map(response => { return response.json() })
            .map(json => { return json.value });
    }

    //getCategoriesByParentKey(key) {
    //    return this.getCategoriesByKey(key)
    //        .map(response => this.getCategoriesByParentId(response.Id));
    //}

    getProductById(id) {
        return this.http.get(this.productsCollectionUrl + '(' + id + ')/?$expand=Price,Categories,Links,Ingredients($expand=Child,ChildUom)')
            .map(response => { return response.json() })
            .map(json => { return json.value });
    }

    getProductsByCategoryId(id) {
        return this.http.get(this.productsCollectionUrl + '/?$filter=Categories/any(d:d/Id eq ' + id + ')&$expand=Price,Categories,Links,Ingredients($expand=Child,ChildUom)')
            .map(response => { return response.json() })
            .map(json => { return json.value });
    }
}