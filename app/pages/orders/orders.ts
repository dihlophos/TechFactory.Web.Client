import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {Platform} from 'ionic-angular';
import {OrderPage} from '../order/order';
import {ApiService} from '../../services/api';

@Component({
    templateUrl: 'build/pages/orders/orders.html'
})
export class OrdersPage {  
    order: string = "orders";
    isAndroid: boolean = false;

    constructor(
        private navController: NavController,
        private platform: Platform) {
        this.isAndroid = platform.is('android');
    }

    openOrderPage() {
        this.navController.push(OrderPage, {
        
        });
    }
}
