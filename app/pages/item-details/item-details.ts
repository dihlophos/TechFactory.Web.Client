import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {NavParams} from 'ionic-angular';
import {OnInit} from '@angular/core';
import {AppSettings} from '../../app.settings';
import {CategoryPage} from '../category/category';
import {OrdersService} from '../../providers/orders-service/orders-service';
import {AddCountableButton} from '../../components/add-countable-button/add-countable-button';

@Component({
    templateUrl: 'build/pages/item-details/item-details.html',
    directives: [AddCountableButton],
})
export class ItemDetailsPage implements OnInit {

    public defaultImageUri:string = AppSettings.DEFAULT_IMAGE_URI;
    public enableAddCountableButton: boolean = false;
    public selectedItem;
    public orderLine;

    constructor(private _navController: NavController,
    	private _navParams: NavParams,
		private _ordersService: OrdersService) {
        this.selectedItem = _navParams.get('item');
    }

    ngOnInit() {
		this.getOrderLine();
    }

    qtyChanged(event) {
		this.enableAddCountableButton = false;
		this.orderLine.Qty = event.value;
		this._ordersService.saveOrderLine(this.orderLine).then(
			line => {
				this.orderLine = line;
				this.enableAddCountableButton = true;
			}
		);
    }

    getOrderLine() {
		this._ordersService.getOrderLine(this.selectedItem).then(
			line => { this.orderLine = line; this.enableAddCountableButton = true; console.log(this.enableAddCountableButton) }
		);	
    }
}
