import {Page, NavController, NavParams} from 'ionic-angular';
import {AddItemButton} from '../../add-item-button.component';


@Page({
    templateUrl: 'build/pages/item-details/item-details.html',
    directives: [ AddItemButton ]
})
export class ItemDetailsPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }
}
