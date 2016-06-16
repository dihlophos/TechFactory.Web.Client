import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {NavParams} from 'ionic-angular';
import {AppSettings} from '../../appsettings';
import {CategoryPage} from '../category/category';
import {AddCountableButton} from '../../components/add-countable-button/add-countable-button';

@Component({
    templateUrl: 'build/pages/item-details/item-details.html',
    directives: [AddCountableButton]
})
export class ItemDetailsPage  {

    public selectedItem;
    private defaultImageUri = AppSettings.DEFAULT_IMAGE_URI;

    constructor(private _navController: NavController, private _navParams: NavParams) {
        this.selectedItem = _navParams.get('item');
    }
}
