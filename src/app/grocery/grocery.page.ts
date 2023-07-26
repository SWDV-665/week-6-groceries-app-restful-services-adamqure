import { Component } from '@angular/core';
import { Grocery } from './grocery';
import { IonItemSliding } from '@ionic/angular';
import { Observable } from 'rxjs';
import { GroceriesService } from '../services/groceries.service';
import { InputDialogService } from '../services/input-dialog.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-grocery',
  templateUrl: 'grocery.page.html',
  styleUrls: ['grocery.page.scss']
})
export class GroceryPage {
  groceries: Observable<Grocery[]> = new Observable()

  constructor(public dataService: GroceriesService, public inputDialogService: InputDialogService, private socialSharing: SocialSharing) {
    this.groceries = this.dataService.getItems().asObservable();
  }

  async editItem(grocery: Grocery, index: number, listInput: IonItemSliding) {
    let newGrocery = await this.inputDialogService.showItemPrompt('Edit Item', 'Please enter item...', grocery)
    this.dataService.editItem(newGrocery, index, listInput);
  }

  async removeItem(grocery: Grocery, index: number, listInput: IonItemSliding) {
    this.dataService.removeItem(grocery, index, listInput);
  }

  async addItem() {
    let newGrocery = await this.inputDialogService.showItemPrompt('Add Item', 'Please enter item...');
    this.dataService.addItem(newGrocery);
  }

  async shareItem(grocery: Grocery, _index: number, listInput: IonItemSliding) {
    console.log("Sharing Item: ", grocery);
    this.dataService.close(listInput);

    let message = "Grocery Item - Name: " + grocery.name + " - Quantity: " + grocery.count;
    let subject = "Shared via Groceries app";

    this.socialSharing.share(
      message, 
      subject
    ).then(() => {
      console.log("Grocery was shared succesfully");
    }).catch((error: any) => {
      console.log("Error sharing grocery item: ", error);
    })
  }
}