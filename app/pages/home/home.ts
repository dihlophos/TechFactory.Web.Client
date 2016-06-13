import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';

import {CategoryPage} from '../category/category';
import {ApiService} from '../../services/api';

@Component({
    templateUrl: 'build/pages/home/home.html',
    providers: [ApiService]
})
export class HomePage {

    public items;

    constructor(private _navController: NavController, private api: ApiService) {

        this.api.getCategoryByKey('MENU').subscribe(
            data => {
                this.api.getCategoriesByParentId(data.Id).subscribe(
                    data => {
                        this.items = data;
                    },
                    err => this.errorHandler,
                    () => console.log('getCategoriesByParentId completed')
                );
            },
            err => this.errorHandler,
            () => console.log('getCategoryByKey completed'));
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
