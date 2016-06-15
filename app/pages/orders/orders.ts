import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {Platform} from 'ionic-angular';

import {ApiService} from '../../services/api';

@Component({
    templateUrl: 'build/pages/orders/orders.html'
})
export class OrdersPage {  
    order: string = "orders";
    isAndroid: boolean = false;

    constructor(platform: Platform) {
        this.isAndroid = platform.is('android');
    }
}
