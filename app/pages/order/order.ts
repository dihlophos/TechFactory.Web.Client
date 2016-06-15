import {Component} from "@angular/core";
import {Platform, ActionSheet, NavController} from 'ionic-angular';

import {ApiService} from '../../services/api';

@Component({
    templateUrl: 'build/pages/order/order.html'
})
export class OrderPage {  

    constructor(public platform: Platform, public nav: NavController) { }

    openMenu() {
        let actionSheet = ActionSheet.create({
            title: 'Options',
            cssClass: 'order',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: () => {
                        console.log('Delete clicked');
                    }
                },
                {
                    text: 'Add',
                    icon: !this.platform.is('ios') ? 'heart-outline' : null,
                    handler: () => {
                        console.log('Add clicked');
                    }
                },
                {
                    text: 'Take',
                    icon: !this.platform.is('ios') ? 'heart-outline' : null,
                    handler: () => {
                        console.log('Take clicked');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel', // will always sort to be on the bottom
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        this.nav.present(actionSheet);
    }
}
