import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AppSettings} from '../../appsettings';
import 'rxjs/add/operator/map';

/*
  Generated class for the CategoriesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CategoriesService {
  private _categoriesCollectionUrl: string = `${AppSettings.API_ENDPOINT}/Categories`;

  constructor(public http: Http) {}

  getByKey(key: string) {
    return new Promise(resolve => {
      this.http.get(`${this._categoriesCollectionUrl}/?$filter=Key eq '${key}'&$expand=Links`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.value[0]);
        });
    });
  }

  getByParentId(id: string) {
    return new Promise(resolve => {
    this.http.get(`${this._categoriesCollectionUrl}/?$filter=ParentId eq ${id}&$expand=Links`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.value);
        });
    });
  }

}

