import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {NavParams} from 'ionic-angular';

import {ProductsService} from '../../providers/products-service/products-service';
import {CategoriesService} from '../../providers/categories-service/categories-service';
import {ItemDetailsPage} from '../item-details/item-details';

@Component({
    templateUrl: 'build/pages/category/category.html',
    providers: [ProductsService, CategoriesService]
})
export class CategoryPage {

    public items;
    public categories;
    public selectedItem;

    constructor(private _navController: NavController,
        private _navParams: NavParams,
        private _productsService: ProductsService,
        private _categoriesService: CategoriesService) {


        this.selectedItem = _navParams.get('item');
        console.log(this.selectedItem);

        _categoriesService.getByParentId(this.selectedItem.Id)
            .then(data => {
                this.categories = data;
            })

        _productsService.getByCategoryId(this.selectedItem.Id)
            .then(data => {
                this.items = data;
            })
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