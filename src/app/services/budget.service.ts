import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Time } from '@angular/common';
import { Profile } from 'src/app/services/profile.service';
import { AngularFireAuth } from "angularfire2/auth";
import { AlertController } from '@ionic/angular';

export interface Budget {
  id?: string;
  Category: string;
  SubCategory: string;
  BudgetName: string;
  SearchName: string;
  EstimatedCost: number;
  ActualCost: number;
  Deposit: number;
  Comments: string;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(
    public db: AngularFirestore,
    public alertController: AlertController,
    private afAuth: AngularFireAuth) { }

  getBudgets() {
    var authUser = this.afAuth.auth.currentUser;

    return new Promise<any>((resolve, reject) => {
      this.db.collection<Profile>('profile').doc(authUser.uid).collection('budgets').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }

  getBudget(id) {
    var authUser = this.afAuth.auth.currentUser;
    let eventsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('budgets');
    return eventsCollection.doc<Event>(id).valueChanges();
  }

  updateBudget(budget: Budget, id: string) {
    var tmp = budget;
    tmp.SearchName = budget.BudgetName.toLowerCase();
    var authUser = this.afAuth.auth.currentUser;
    let eventsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('budgets');
    return eventsCollection.doc(id).update(tmp);
  }

  removeBudget(id) {
    var authUser = this.afAuth.auth.currentUser;
    let eventsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('budgets');
    return eventsCollection.doc(id).delete();
  }

  searchBudgetName(searchValue){
    var authUser = this.afAuth.auth.currentUser;
    return new Promise<any>((resolve, reject) => {
      this.db.collection<Profile>('profile').doc(authUser.uid).collection('budgets', ref => ref.where('SearchName', '>=', searchValue)
      .where('SearchName', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    })
  }

  async startBudgetAdd() {
    var options = {
      header: "Budget Category",
      subHeader: "Please select a budget category",
      inputs: [],
      buttons: [
        {
          text: 'Ok',
          handler: (data: any) => {
            console.log('Data: ' + data);
          }
        }
      ]
    };
  
    /*for (let item of this.dinners) {
      options.inputs.push({ name : item.Name, value: item.id , label: item.Name, type: 'radio'});
    }*/

    let alert = await this.alertController.create(options);
    await alert.present();
  }

}
