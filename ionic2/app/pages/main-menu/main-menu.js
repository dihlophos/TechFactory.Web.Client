import {Page, NavController, NavParams} from 'ionic-angular';
import {ListPage} from '../list/list';
import {Api} from '../../api';

@Page({
  templateUrl: 'build/pages/main-menu/main-menu.html',
  providers: [Api]
})
export class MainMenuPage {
    
  static get parameters() {
      return [[NavController], [Api]];
  }
  
  constructor(nav, api) {
      this.nav = nav;
      
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
}


