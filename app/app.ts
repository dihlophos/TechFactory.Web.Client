import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {HomePage} from './pages/home/home';
import {CategoryPage} from './pages/category/category';
import {OrdersPage} from './pages/orders/orders';


@Component({
    templateUrl: 'build/app.html'
})
export class MyApp {

    rootPage: any = HomePage;

    public pages: any = [
        { title: 'Login', component: HomePage },
        { title: 'Menu', component: HomePage },
        { title: 'Orders', component: OrdersPage },
        { title: 'Payments', component: HomePage },
        { title: 'Locations', component: HomePage },
        { title: 'Help', component: HomePage },
        { title: 'Sing in', component: HomePage }
    ];

  constructor(platform: Platform) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
