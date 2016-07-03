import {Component, OnInit} from "@angular/core";
import {Platform, ActionSheet, NavController, NavParams} from 'ionic-angular';
import {AppSettings} from '../../app.settings';
import {FormatISOStringPipe} from '../../components/format-isostringpipe/format-isostringpipe';

@Component({
    templateUrl: 'build/pages/order/order.html',
    pipes: [FormatISOStringPipe]
})
export class OrderPage {

	private defaultImageUri:string = AppSettings.DEFAULT_IMAGE_URI;
	private order;

    constructor(private platform: Platform,
	private nav: NavController,
	private navParams: NavParams) {
    	this.order = navParams.get('order');
    }

}
