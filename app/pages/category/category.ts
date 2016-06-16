import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {OnInit} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {AppSettings} from '../../app.settings';
import {ProductsService} from '../../providers/products-service/products-service';
import {CategoriesService} from '../../providers/categories-service/categories-service';
import {ItemDetailsPage} from '../item-details/item-details';

@Component({
    templateUrl: 'build/pages/category/category.html',
    providers: [ProductsService, CategoriesService]
})
export class CategoryPage implements OnInit {

    public items;
    public categories;
    public selectedItem;
    private order;
    private defaultImageUri = AppSettings.DEFAULT_IMAGE_URI;

    constructor(private _navController: NavController,
        private _navParams: NavParams,
        private _productsService: ProductsService,
        private _categoriesService: CategoriesService) { 
            this.order = this._navParams.get('order');
    }

    ngOnInit() {
        this.selectedItem = this._navParams.get('item');

        this.getCategories();

        this.getProducts();
    }

    getCategories() {
        this._categoriesService.getByParentId(this.selectedItem.Id)
            .then(data => {
                this.categories = data;
            });
    }

    getProducts() {
        this._productsService.getByCategoryId(this.selectedItem.Id)
            .then(data => {
                this.items = data;
            });
    }

    errorHandler(err) {
        console.error(err);
    }

    itemTapped(event, item) {
        this._navController.push(ItemDetailsPage, {
            item: item,
            order: this.order
        });
    }

    moveToCategoryPage(event, item) {
        this._navController.push(CategoryPage, {
            item: item,
            order: this.order
        });
    }
}