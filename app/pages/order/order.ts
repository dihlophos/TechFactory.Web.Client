import {Component} from "@angular/core";
import {Platform, ActionSheet, NavController} from 'ionic-angular';

import {ApiService} from '../../services/api';

@Component({
    templateUrl: 'build/pages/order/order.html'
})
export class OrderPage {  

    constructor(public platform: Platform, public nav: NavController) { }

}
