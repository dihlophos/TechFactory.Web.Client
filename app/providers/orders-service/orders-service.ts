import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AppSettings} from '../../app.settings';
import 'rxjs/add/operator/map';


@Injectable()
export class OrdersService {
  private ordersCollectionUrl: string = `${AppSettings.API_ENDPOINT}/Orders`;
  private orderLinesCollectionUrl: string = `${AppSettings.API_ENDPOINT}/OrderLines`;
  private headers: Headers = new Headers();
  private draft:any;
  private completedOrders:any[];
  private openOrders:any[];

  constructor(public http: Http) {
    this.headers.append('Content-Type', 'application/json');
  }

  getDraft() {
  	
  	if (this.draft) {
  		return Promise.resolve(this.draft);
  	}

    return new Promise(resolve => {
      this.queryDraft().then(
        order => {
          if (order) {
            this.draft = order;
            resolve(order);
          }
          else {
            this.save({
              Date: new Date().toISOString(),
              DueDate: new Date().toISOString(),
              Number: "SO001",
              Type: "SO"
            }).then(order => { 
              this.draft = order;
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
          if (orderLine.Id) {
            for (let lineIdx in this.draft.Lines.length) {
              if (this.draft.Lines[lineIdx].Id == line.Id) {
                this.draft.Lines[lineIdx] = line;
                break;
              }
            }
          }
          else {
           this.draft.Lines.push(line);
          }
          resolve(line);
        }
      );
    });
  }

  getOrderLine(item:any) {

  	return new Promise(resolve => {
  		this.getDraft().then(

	  		draft => {
	  			for (let line of this.draft.Lines) {
			      if (line.Item.Id === item.Id) {
			        resolve(line);
			      }
			    }
				
				resolve({
					Qty: 0,
					ItemId: item.Id,
					OrderId: this.draft.Id
				});
	  		}
		);
  	});
  }

  getCompletedOrders() {
  	
  	if (this.completedOrders) {
  		return Promise.resolve(this.completedOrders);
  	}

  	return new Promise(resolve => {
      this.http.get(`${this.ordersCollectionUrl}/?$filter=StatusCode eq 'CLOSED' or StatusCode eq 'CANCELED'&$expand=Lines($expand=Item($expand=Links))`)
      .map(res => res.json())
      .subscribe(data => {
      	this.completedOrders = data.value;
        resolve(data.value);
      });
    });

  }

  getOpenOrders() {
  	
  	if (this.openOrders) {
  		return Promise.resolve(this.openOrders);
  	}

  	return new Promise(resolve => {
      this.http.get(`${this.ordersCollectionUrl}/?$filter=StatusCode ne 'CLOSED' and StatusCode ne 'CANCELED'&$expand=Lines($expand=Item($expand=Links))`)
      .map(res => res.json())
      .subscribe(data => {
      	this.openOrders = data.value;
        resolve(data.value);
      });
    });

  }

  private save(order:any) {
    if (order.Id) {
      return new Promise(resolve => {
        this.http.put(this.ordersCollectionUrl + '(' + order.Id + ')', JSON.stringify(order), { headers: this.headers })
        .subscribe(() => {
          resolve(null);
        })
      });
    }       

    return new Promise(resolve => {
		this.http.post(this.ordersCollectionUrl, JSON.stringify(order), { headers: this.headers })
		.map(res => res.json())
		.subscribe(data => {
		  resolve(data.value);
		});
	});

  }

  private sendOrderLine(orderLine: any) {

    if (orderLine.Id) {
      return new Promise(resolve => {
        this.http.put(this.orderLinesCollectionUrl + '(' + orderLine.Id + ')', JSON.stringify(orderLine), { headers: this.headers })
        .subscribe(() => {
          resolve(orderLine);
        })
      });
    }

	return new Promise(resolve => {
		this.http.post(this.orderLinesCollectionUrl, JSON.stringify(orderLine), { headers: this.headers })
		.map(res => res.json())
		.subscribe(data => {
		  resolve(data.value);
		});
	});
    
  }

  private queryDraft() {
    if (this.draft) {
      return Promise.resolve(this.draft);
    }
    return new Promise(resolve => {
      this.http.get(`${this.ordersCollectionUrl}/?$filter=StatusCode eq 'DRAFT'&$top=1&$expand=Lines($expand=Item($expand=Links))`) //TODO: $expand=Links doesn't works((
      .map(res => res.json())
      .subscribe(data => {
        resolve(data.value[0]);
      });
    });
  }
}