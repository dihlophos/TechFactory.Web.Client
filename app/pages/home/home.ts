import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';

import {CategoryPage} from '../category/category';
import {CategoriesService} from '../../providers/categories-service/categories-service';

@Component({
    templateUrl: 'build/pages/home/home.html',
    providers: [CategoriesService]
})
export class HomePage {

    public items;

    constructor(private _navController: NavController, private _categoriesService: CategoriesService) {

        _categoriesService.getByKey('MENU')
			.then(
			data => {
				console.log(data);
				this._categoriesService.getByParentId(data.Id)
					.then(
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
            item: item
        });
    }
}
