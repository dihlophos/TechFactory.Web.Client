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
    providers: [CategoriesService]
})
export class HomePage implements OnInit {

    public categories;
    private order;
    private defaultImageUri = AppSettings.DEFAULT_IMAGE_URI;

    constructor(private _navController: NavController,
        private _navParams: NavParams,
        private _categoriesService: CategoriesService,
        private _ordersService: OrdersService) {
    }

    ngOnInit() {
        this.getOrder();
        this.getCategories();      
    }

    getOrder() {
        this._ordersService.getDraft().then(
            draft => {
                console.log(draft);
            }
        );
    }

    getCategories() {
        this._categoriesService.getByKey('MENU').then(
            rootCategory => {
                this._categoriesService.getByParentId(rootCategory.Id).then(
                    categories => {
                        this.categories = categories;
                    }
                )
            });
    }

    errorHandler(err) {
        console.error(err);
    }

    moveToCategoryPage(event, item) {
        this._navController.push(CategoryPage, {
            item: item
        });
    }
}
