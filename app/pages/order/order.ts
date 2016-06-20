import {Component} from "@angular/core";
import {OnInit} from '@angular/core';
import {Platform, ActionSheet, NavController} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/order/order.html'
})
export class OrderPage {  

    constructor(public platform: Platform, public nav: NavController) { }

}
