import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {NavParams} from 'ionic-angular';

import {ApiService} from '../../services/api';
import {ItemDetailsPage} from '../item-details/item-details';

@Component({
    templateUrl: 'build/pages/category/category.html',
    providers: [ApiService]
})
export class CategoryPage {

    public items;
    public categories;
    public selectedItem;

    constructor(private _navController: NavController, private _navParams: NavParams, private api: ApiService) {


        this.selectedItem = _navParams.get('item');
        console.log(this.selectedItem);

        api.getCategoriesByParentId(this.selectedItem.Id)
            .subscribe(data => {
                console.log(data);
                this.categories = data;
            },
            err => this.errorHandler,
            () => console.log('getCategoriesByParentId completed'));

        api.getProductsByCategoryId(this.selectedItem.Id)
            .subscribe(data => {
                console.log(data);
                this.items = data;
            },
            err => this.errorHandler,
            () => console.log('getProductsByCategoryId completed'));
    }

    errorHandler(err) {
        console.error(err);
    }

    itemTapped(event, item) {
        this._navController.push(ItemDetailsPage, {
            item: item
        });
    }

    moveToCategoryPage(event, item) {
        this._navController.push(CategoryPage, {
            item: item
        });
    }
}