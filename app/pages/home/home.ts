import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {AppSettings} from '../../app.settings';
import {CategoryPage} from '../category/category';
import {OnInit} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {CategoriesService} from '../../providers/categories-service/categories-service';
import {OrdersService} from '../../providers/orders-service/orders-service';

@Component({
    templateUrl: 'build/pages/home/home.html',
    providers: [CategoriesService, OrdersService]
})
export class HomePage implements OnInit {

    public items;
    private order;
    private defaultImageUri = AppSettings.DEFAULT_IMAGE_URI;

    constructor(private _navController: NavController,
        private _navParams: NavParams,
        private _categoriesService: CategoriesService,
        private _ordersService: OrdersService) {
        this.order = this._navParams.get('order');
    }

    ngOnInit() {
        this.getOrder();
        this.getCategories();        
    }

    getOrder() {
        if (!this.order) {
            this._ordersService.getDraft().then(
                data => {
                    if (data) {
                        this.order = data;
                    }
                    else {
                        this._ordersService.save({
                            Date: new Date().toISOString(),
                            DueDate: new Date().toISOString(),
                            Number: "SO001",
                            Type: "SO"
                        }).then(data => { this.order = data; });
                    }
                }
            )
        }
    }

    getCategories() {
        this._categoriesService.getByKey('MENU').then(
            data => {
                this._categoriesService.getByParentId(data.Id).then(
                    data => {
                        this.items = data;
                    }
                )
            });
    }

    errorHandler(err) {
        console.error(err);
    }

    moveToCategoryPage(event, item) {
        this._navController.push(CategoryPage, {
            item: item,
            order: this.order
        });
    }
}
