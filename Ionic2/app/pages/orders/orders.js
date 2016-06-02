import {Page, NavController, NavParams} from 'ionic-angular';


import {Api} from '../../api';

@Page({
    templateUrl: 'build/pages/orders/orders.html',
  providers: [Api]
})
export class OrdersPage {
  static get parameters() {
      return [[NavController], [NavParams], [Api]];
  }

  //constructor(nav, navParams, api) {
  //  this.nav = nav;
      
  //  // If we navigated to this page, we will have an item available as a nav param
  //  this.selectedItem = navParams.get('item');
  //  console.log(this.selectedItem);
    
  //  this.items = [];
  //  this.categories = [];

  //  api.getCategoriesByParentId(this.selectedItem.Id)
  //    .then((data) => { 
  //      console.log(data);
  //      this.categories = data;
  //  });
    
  //  api.getProductsByCategoryId(this.selectedItem.Id)
  //    .then((data) => { 
  //      console.log(data);
  //      this.items = data;
  //  });

  //  /*
  //  this.items = [];
  //  for(let i = 1; i < 11; i++) {
  //    this.items.push({
  //      title: 'Item ' + i,
  //      note: 'This is item #' + i,
  //      icon: this.icons[Math.floor(Math.random() * this.icons.length)]
  //    });
  //  }*/
  //}

  //itemTapped(event, item) {
  //   this.nav.push(ItemDetailsPage, {
  //     item: item
  //   });
  //}

  //moveToCategoryPage (event, item) {
  //    this.nav.push(ListPage, {
  //        item: item
  //    });
  //}
}
