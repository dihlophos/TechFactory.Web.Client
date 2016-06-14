import {Component, Input} from '@angular/core';
//import {Api} from './api';

@Component({
    selector: 'add-countable-button',
    inputs: ['item'],
    template: `
        <button fab fab-right fab-top class="fab-map" (click)="addItemToBasket($event, item)">
            <ion-icon *ngIf="addIcon" name="add"></ion-icon>
            <h1 *ngIf="!addIcon">{{idx}}</h1>
        </button>`
})
export class AddCountableButton {  

    private addIcon: boolean;
    private idx: number;

    //constructor(api) {
    constructor() {
        this.addIcon = true;
        this.idx = 0;
        //this.api = api;
    }

    addItemToBasket(event, item) {
        console.debug('addItemToBasket');
        this.addIcon = false;
        this.idx++;
    //    this.api.addItemToBasket(item);
    }
}
