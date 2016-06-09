import {Page, NavController, NavParams} from 'ionic-angular';
import {ListPage} from '../list/list';
import {Api} from '../../api';
import {BasketButton} from '../../basket-button.component';

@Page({
    templateUrl: 'build/pages/main-menu/main-menu.html',
    directives: [ BasketButton ]
})
export class MainMenuPage {
    
  static get parameters() {
      return [[NavController], [Api]];
  }
  
  constructor(nav, api) {
      this.nav = nav;
      this.api = api;
      
      api.getCategoriesByParentKey('MENU')
            .then((data) => { 
            console.log(data);
            this.items = data;
      });
  }

  moveToCategoryPage (event, item) {
      this.nav.push(ListPage, {
          item: item
      });
  }

  getBasket() {
      this.api.getBasket();
  }
}


