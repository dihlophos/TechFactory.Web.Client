import {ViewChild} from '@angular/core';
import {App, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {MainMenuPage} from './pages/main-menu/main-menu';
import {ListPage} from './pages/list/list';
import {CategoryListPage} from './pages/category-list/category-list';


@App({
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  queries: {
    nav: new ViewChild('content')
  }
})
class MyApp {
  static get parameters() {
    return [[Platform], [MenuController]];
  }

  constructor(platform, menu, api) {
    this.platform = platform;
    this.menu = menu;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Login', component: MainMenuPage },
      { title: 'Menu', component: MainMenuPage },
      { title: 'Orders', component: ListPage },
      { title: 'Payments', component: CategoryListPage },
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