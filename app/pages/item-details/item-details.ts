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
    providers: [OrdersService]
})
export class ItemDetailsPage implements OnInit {

    public selectedItem;
    private defaultImageUri = AppSettings.DEFAULT_IMAGE_URI;
    private order;
    private orderLine;

    constructor(private _navController: NavController,
    	private _navParams: NavParams,
		private _ordersService: OrdersService) {
        this.selectedItem = _navParams.get('item');
        this.order = this._navParams.get('order');
    }

    ngOnInit() {
		this.getOrderLine();
    }

    incQty(event) {
		this.orderLine.Qty = event.value;
		this._ordersService.saveOrderLine(this.orderLine).then(
			data => {
				this.orderLine = data;
			}
		);
    }

    getOrderLine() {
		let lineFound: boolean = false;
		for (let line of this.order.Lines) {
			if (line.Item.Id === this.selectedItem.Id) {
				this.orderLine = line;
				lineFound = true;
			}

			if (!lineFound) {
				this._ordersService.saveOrderLine({
					Qty: 0,
					ItemId: this.selectedItem.Id,
					OrderId: this.order.Id
				}).then(
					data => {
						this.orderLine = data;
					}
				)
			}
		}
    }
}
