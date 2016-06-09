import {Component} from '@angular/core';
import {Api} from './api';

@Component({
    selector: 'basket-button',
    template: `
        <button royal (click)="getBasket($event)">
          <ion-icon name="cart"></ion-icon>
        </button>`
})
export class BasketButton {  
    
    static get parameters() {
        return [[Api]];
    }

    constructor(api) {
        this.api = api;
    }

    getBasket(event){
        this.api.getBasket();
    }
}
