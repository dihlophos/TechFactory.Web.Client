import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'add-countable-button',
    template: `
        <button fab fab-right fab-top class="fab-map" (click)="addItemToBasket($event)">
            <ion-icon *ngIf="addIcon" name="add"></ion-icon>
            <h1 *ngIf="!addIcon">{{idx}}</h1>
        </button>`
})
export class AddCountableButton {  

    private addIcon: boolean;
    
    @Input()
    value: number;

    @Output()
    counterChange = new EventEmitter();

    //constructor(api) {
    constructor() {
        this.addIcon = this.value != 0;
        console.log(this.value);
    }

    addItemToBasket(event) {
        this.value++;
        this.counterChange.emit({
            value: this.value
        })
    //    this.api.addItemToBasket(item);
    }
}
