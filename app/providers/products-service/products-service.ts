import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AppSettings} from '../../app.settings';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductsService {
  private _productsCollectionUrl: string = `${AppSettings.API_ENDPOINT}/Products`;

  constructor(public http: Http) {}

  getById(id: string) {
    return new Promise(resolve => {
    this.http.get(`${this._productsCollectionUrl}(${id})/?$expand=Price,Categories,Links,Ingredients($expand=Child,ChildUom)`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.value);
        });
    });
  }

  getByCategoryId(id: string) {
    return new Promise(resolve => {
    this.http.get(`${this._productsCollectionUrl}/?$filter=Categories/any(d:d/Id eq ${id})&$expand=Price,Categories,Links,Ingredients($expand=Child,ChildUom)`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.value);
        });
    });
  }
}

