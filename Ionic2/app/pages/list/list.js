import {Page, NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';

import {Api} from '../../api';

@Page({
  templateUrl: 'build/pages/list/list.html',
  providers: [Api]
})
export class ListPage {
  static get parameters() {
      return [[NavController], [NavParams], [Api]];
  }

  constructor(nav, navParams, api) {
    this.nav = nav;
      
    api.getCategoriesByParentKey('MENU')
      .then((data) => { 
        console.log(data);
        alert(data);
    });

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
     this.nav.push(ItemDetailsPage, {
       item: item
     });
  }
}
