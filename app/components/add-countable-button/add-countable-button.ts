import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'add-countable-button',
    template: `
        <button fab fab-right fab-top class="fab-map" (click)="addItemToBasket($event)">
            <ion-icon *ngIf="!value" name="add"></ion-icon>
            <h1 *ngIf="value">{{value}}</h1>
        </button>`
})
export class AddCountableButton {  

    @Input()
    value: number;

    @Output()
    counterChange = new EventEmitter();

    constructor() {
    }

    addItemToBasket(event) {
        this.value++;
        this.counterChange.emit({
            value: this.value
        })
    }
}
