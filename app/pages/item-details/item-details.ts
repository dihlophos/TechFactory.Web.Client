import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {NavParams} from 'ionic-angular';

import {CategoryPage} from '../category/category';
import {ApiService} from '../../services/api';
import {AddCountableButton} from '../../components/add-countable-button/add-countable-button';

@Component({
    templateUrl: 'build/pages/item-details/item-details.html',
    providers: [ApiService],
    directives: [AddCountableButton]
})
export class ItemDetailsPage  {

    public selectedItem;

    constructor(private _navController: NavController, private _navParams: NavParams, private api: ApiService) {
        this.selectedItem = _navParams.get('item');
    }
}
