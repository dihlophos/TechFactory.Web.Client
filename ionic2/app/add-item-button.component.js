import {Component, Input} from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import {Api} from './api';

@Component({
    selector: 'add-item-button',
    inputs: ['item'],
    template: `
        <button fab fab-right fab-top class="fab-map" (click)="addItemToBasket($event, item)">
            <ion-icon *ngIf="addIcon" name="add"></ion-icon>
            <h1 *ngIf="!addIcon">{{i}}</h1>
        </button>`
})
export class AddItemButton {  
    
    static get parameters() {
        return [[Api]];
    }

    constructor(api) {
        this.addIcon = true;
        this.i = 0;
        this.api = api;
    }

    addItemToBasket(event, item){
        this.addIcon = false;
        this.i++;
        this.api.addItemToBasket(item);
    }
}
