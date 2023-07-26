import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Grocery } from 'src/app/grocery/grocery';
import { IonItem, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  groceries: BehaviorSubject<Array<Grocery>> = new BehaviorSubject(new Array<Grocery>())

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController) { 
  }

  async editItem(grocery: Grocery, index: number, listInput: IonItemSliding) {
    this.close(listInput);
    var groceryList = this.groceries.getValue();
    groceryList[index] = grocery;
    this.groceries.next(groceryList);
  }

  async removeItem(grocery: Grocery, index: number, listInput: IonItemSliding) {
    this.close(listInput);
    var groceryList = this.groceries.getValue();
    groceryList.splice(index, 1);
    this.groceries.next(groceryList);
  }

  getItems() {
    return this.groceries
  }

  addItem(grocery: Grocery) {
    console.log("Adding Item");
    var groceryList = this.groceries.getValue();
    groceryList.push(grocery);
    this.groceries.next(groceryList);
  }

  close(listInput: IonItemSliding) {
    console.log("Closing item...")
    listInput.close();
  }
}