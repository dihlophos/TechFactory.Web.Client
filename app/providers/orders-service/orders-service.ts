import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AppSettings} from '../../app.settings';
import 'rxjs/add/operator/map';


@Injectable()
export class OrdersService {
  private _ordersCollectionUrl: string = `${AppSettings.API_ENDPOINT}/Orders`;
  private _orderLinesCollectionUrl: string = `${AppSettings.API_ENDPOINT}/OrderLines`;
  private headers: Headers = new Headers();
  private _draft:any;

  constructor(public http: Http) {
    this.headers.append('Content-Type', 'application/json');
  }

  getDraft() {
    return new Promise(resolve => {
      this.queryDraft().then(
        order => {
          if (order) {
            this._draft = order;
            resolve(order);
          }
          else {
            this.save({
              Date: new Date().toISOString(),
              DueDate: new Date().toISOString(),
              Number: "SO001",
              Type: "SO"
            }).then(order => { 
              this._draft = order;
              resolve(order);
            });
          }
        }
        );
    })
  }

  saveOrderLine(orderLine:any) {
    return new Promise(resolve => {
      this.sendOrderLine(orderLine).then(
        line => {
          for (let lineIdx: number = 0; lineIdx < this._draft.Lines.length; lineIdx++) {
            if (this._draft.Lines[lineIdx].Id == line.Id) {
              this._draft.Lines[lineIdx] = line;
              break;
            }
          }
          resolve(line);
        }
      );
    });
  }

  getOrderLine(item:any) {

    for (let line of this._draft.Lines) {
      if (line.Item.Id === item.Id) {
        return Promise.resolve(line);
      }
    }
    console.log("create");

    return new Promise(resolve => {
      this.sendOrderLine({
        Qty: 0,
        ItemId: item.Id,
        OrderId: this._draft.Id
      }).then(
      line => {
        this._draft.Lines.push(line);
        resolve(line);
      }
      )
    })
  }

  private save(order:any) {
    if (order.Id) {
      return new Promise(resolve => {
        this.http.put(this._ordersCollectionUrl + '(' + order.Id + ')', JSON.stringify(order), { headers: this.headers })
        .subscribe(() => {
          resolve(null);
        })
      });
    }
    else {
      return new Promise(resolve => {
        this.http.post(this._ordersCollectionUrl, JSON.stringify(order), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.value);
        });
      });
    }
  }

  private sendOrderLine(orderLine: any) {

    if (orderLine.Id) {
      return new Promise(resolve => {
        this.http.put(this._orderLinesCollectionUrl + '(' + orderLine.Id + ')', JSON.stringify(orderLine), { headers: this.headers })
        .subscribe(() => {
          resolve(null);
        })
      });
    }
    else {
      return new Promise(resolve => {
        this.http.post(this._orderLinesCollectionUrl, JSON.stringify(orderLine), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.value);
        });
      });
    }
  }

  private queryDraft() {
    if (this._draft) {
      return Promise.resolve(this._draft);
    }
    return new Promise(resolve => {
      this.http.get(`${this._ordersCollectionUrl}/?$filter=StatusCode eq 'DRAFT'&$top=1&$expand=Lines($expand=Item)`)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data.value[0]);
      });
    });
  }
}