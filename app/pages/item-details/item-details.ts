import {Component, OnInit} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import {AppSettings} from '../../app.settings';
import {CategoryPage} from '../category/category';
import {OrdersService} from '../../providers/orders-service/orders-service';
import {AddCountableButton} from '../../components/add-countable-button/add-countable-button';

@Component({
    templateUrl: 'build/pages/item-details/item-details.html',
    directives: [AddCountableButton],
})
export class ItemDetailsPage implements OnInit {

    private defaultImageUri:string = AppSettings.DEFAULT_IMAGE_URI;
    private enableAddCountableButton: boolean = false;
    private selectedItem;
    private orderLine;

    constructor(private navController: NavController,
	private navParams: NavParams,
	private ordersService: OrdersService) {
        this.selectedItem = navParams.get('item');
    }

    ngOnInit() {
		this.getOrderLine();
    }

    qtyChanged(event) {
		this.enableAddCountableButton = false;
		this.orderLine.Qty = event.value;
		this.ordersService.saveOrderLine(this.orderLine).then(
			line => {
				this.orderLine = line;
				this.enableAddCountableButton = true;
			}
		);
    }

    getOrderLine() {
		this.ordersService.getOrderLine(this.selectedItem).then(
			line => { 
                this.orderLine = line;
                this.enableAddCountableButton = true;
            }
		);	
    }
}
