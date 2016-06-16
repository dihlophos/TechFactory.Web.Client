import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AppSettings} from '../../app.settings';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProductsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class OrdersService {
    private _ordersCollectionUrl: string = `${AppSettings.API_ENDPOINT}/Orders`;
    private _orderLinesCollectionUrl: string = `${AppSettings.API_ENDPOINT}/OrderLines`;

    constructor(public http: Http) {}

    save(order:any) {
      return new Promise(resolve => {
        if (order.Id) {
          return this.http.put(this._ordersCollectionUrl + '(' + order.Id + ')', order);
        }
        else {
          return this.http.post(this._ordersCollectionUrl, order);
        }
      });
    };

    saveOrderLine(orderLine: any) {
      return new Promise(resolve => {
        if (orderLine.Id) {
          return this.http.put(this._orderLinesCollectionUrl + '(' + orderLine.Id + ')', orderLine);
        }
        else {
          return this.http.post(this._orderLinesCollectionUrl, orderLine);
        }
      });
    };

    getDraft() {
      return new Promise(resolve => {
        this.http.get(`${this._ordersCollectionUrl}/?$filter=StatusCode eq 'DRAFT'&$top=1&$expand=Lines($expand=Item)`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.value[0]);
        });
      });
    }
  }

