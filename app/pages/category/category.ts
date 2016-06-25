import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {OnInit} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {AppSettings} from '../../app.settings';
import {ProductsService} from '../../providers/products-service/products-service';
import {CategoriesService} from '../../providers/categories-service/categories-service';
import {OrdersService} from '../../providers/orders-service/orders-service';
import {ItemDetailsPage} from '../item-details/item-details';

@Component({
    templateUrl: 'build/pages/category/category.html',
    providers: [ProductsService, CategoriesService]
})
export class CategoryPage implements OnInit {

    private itemLines = [];
    private categories;
    private selectedItem;
    private defaultImageUri = AppSettings.DEFAULT_IMAGE_URI;
    private order;
    
    constructor(private navController: NavController,
        private navParams: NavParams,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private ordersService: OrdersService) { }

    ngOnInit() {
        this.selectedItem = this.navParams.get('item');

        this.getCategories();

        this.getItems();

        this.getOrder();
    }

    getOrder() {
        this.ordersService.getDraft();
    }

    getCategories() {
        this.categoriesService.getByParentId(this.selectedItem.Id)
            .then(data => {
                this.categories = data;
            });
    }

    getItems() {
        this.productsService.getByCategoryId(this.selectedItem.Id).then(data => {
            for (let item of data) {
                   this.ordersService.getOrderLine(item).then(
                       orderLine => {
                           this.itemLines.push({item:item,orderLine:orderLine});
                       }
                );
            }
        });
    }

    incQty(itemLine) {
        itemLine.orderLine.Qty++;
        this.ordersService.saveOrderLine(itemLine.orderLine).then(
            line => {
                for (let itemLineIdx in this.itemLines) {
                    if (this.itemLines[itemLineIdx].orderLine.Id == line.Id) {
                        this.itemLines[itemLineIdx].orderLine = line;
                    }
                }
            }
        );
    }

    decQty(itemLine) {
        if (itemLine.orderLine.Qty > 0) {
            itemLine.orderLine.Qty--;
            this.ordersService.saveOrderLine(itemLine.orderLine).then(
                line => {
                    for (let itemLineIdx in this.itemLines) {
                        if (this.itemLines[itemLineIdx].orderLine.Id == line.Id) {
                            this.itemLines[itemLineIdx].orderLine = line;
                        }
                    }
                }
            );
        }
    }

    errorHandler(err) {
        console.error(err);
    }

    itemTapped(event, item) {
        this.navController.push(ItemDetailsPage, {
            item: item
        });
    }

    moveToCategoryPage(event, item) {
        this.navController.push(CategoryPage, {
            item: item
        });
    }
}