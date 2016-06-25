import {Component, OnInit} from "@angular/core";
import {NavController} from 'ionic-angular';
import {Platform} from 'ionic-angular';
import {OrderPage} from '../order/order';
import {OrdersService} from '../../providers/orders-service/orders-service';

@Component({
    templateUrl: 'build/pages/orders/orders.html'
})
export class OrdersPage implements OnInit {  
    private menuStage: string = "orders";
    private isAndroid: boolean = false;
    private completedOrders:any[];
    private openOrders:any[];

    constructor(
    private navController: NavController,
    private platform: Platform,
    private ordersService: OrdersService) {
        this.isAndroid = platform.is('android');
    }

    ngOnInit() {
        this.getOpenOrders();
        this.getCompletedOrders();
    }

    getOpenOrders() {
        this.ordersService.getOpenOrders().then(
            openOrders => {
                this.openOrders = openOrders;
            }
        );
    }

    getCompletedOrders() {
        this.ordersService.getCompletedOrders().then(
            completedOrders => {
                this.completedOrders = completedOrders;
            }
        );
    }

    openOrderPage(order) {
        this.navController.push(OrderPage, {
            order:order
        });
    }
}
