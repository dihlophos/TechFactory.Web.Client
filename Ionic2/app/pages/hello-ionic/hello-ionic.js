import {Page} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html'
})
export class HelloIonicPage {
    constructor() {

    }

  itemslist() {
      this.nav.push(ListPage, {
          item: ""
      });
  }
}


