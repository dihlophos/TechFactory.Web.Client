import {ViewChild} from '@angular/core';
import {Component} from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import {App, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {MainMenuPage} from './pages/main-menu/main-menu';
import {OrdersPage} from './pages/orders/orders';
import {OrderPage} from './pages/order/order';
import {ListPage} from './pages/list/list';
import {CategoryListPage} from './pages/category-list/category-list';
import {Api} from './api';


@App({
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  queries: {
    nav: new ViewChild('content')
  },
  providers: [Api]
})
class MyApp {
  static get parameters() {
    return [[Platform], [MenuController], [Api]];
  }

  constructor(platform, menu, api) {
    this.platform = platform;
    this.menu = menu;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Login', component: MainMenuPage },
      { title: 'Menu', component: MainMenuPage },
      { title: 'Orders', component: OrdersPage },
      { title: 'Payments', component: OrderPage },
      { title: 'Locations', component: CategoryListPage },
      { title: 'Help', component: CategoryListPage },
      { title: 'Sing in', component: CategoryListPage }
    ];

    // make MainMenuPage the root (or first) page
    this.rootPage = MainMenuPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

@Component({
    selector: 'main-item-card',
    template: '<img [src]="{{item.Links[0].Uri}}" /><div class="card-title">{{item.Name}}</div>'
})
export class MainItemCard {  

    constructor() {
    }
}