import {Page, Platform} from 'ionic-angular';

import {Api} from '../../api';

@Page({
    templateUrl: './build/pages/orders/orders.html'
})
export class OrdersPage {  

    itemTapped(event, item) {
        this.nav.push(OrderPage, {    });
    }

 
}
