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
  SearchCategoryName: string;
  SearchSubCategoryName: string;
  EstimatedCost: number;
  ActualCost: number;
  Deposit: number;
  Comments: string;
}

@Injectable({
  providedIn: 'root'
})

export class BudgetService {

  private budgetsCollection: AngularFirestoreCollection<Budget>;
  private budgets: Observable<Budget[]>;

  constructor(
    public db: AngularFirestore,
    public alertController: AlertController,
    private afAuth: AngularFireAuth) { 
      var authUser = this.afAuth.auth.currentUser;
      this.budgetsCollection = db.collection<Profile>('profile').doc(authUser.uid).collection('budgets');

      this.budgets = this.budgetsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }

  getBudgetsToDisplay() {
    return this.budgets;
  }

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
    let BudgetsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('budgets');
    return BudgetsCollection.doc<Budget>(id).valueChanges();
  }

  addBudget(budget: Budget) {
    var tmp = budget;
    tmp.SearchName = budget.SearchName.toLowerCase();
    tmp.SearchCategoryName = budget.Category.toLowerCase();
    tmp.SearchSubCategoryName = budget.SubCategory.toLowerCase();
    var authUser = this.afAuth.auth.currentUser;
    let rsvpsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('budgets');
    return rsvpsCollection.add(tmp);
  }

  updateBudget(budget: Budget, id: string) {
    var tmp = budget;
    tmp.SearchName = budget.BudgetName.toLowerCase();
    tmp.SearchCategoryName = budget.Category.toLowerCase();
    tmp.SearchSubCategoryName = budget.SubCategory.toLowerCase();
    var authUser = this.afAuth.auth.currentUser;
    let BudgetsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('budgets');
    return BudgetsCollection.doc(id).update(tmp);
  }

  removeBudget(id) {
    var authUser = this.afAuth.auth.currentUser;
    let BudgetsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('budgets');
    return BudgetsCollection.doc(id).delete();
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

  searchBudgetCategoryName(searchValue){
    var authUser = this.afAuth.auth.currentUser;
    return new Promise<any>((resolve, reject) => {
      this.db.collection<Profile>('profile').doc(authUser.uid).collection('budgets', ref => ref.where('SearchCategoryName', '>=', searchValue)
      .where('SearchCategoryName', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    })
  }
  
  searchBudgetSubCategoryName(searchValue){
    var authUser = this.afAuth.auth.currentUser;
    return new Promise<any>((resolve, reject) => {
      this.db.collection<Profile>('profile').doc(authUser.uid).collection('budgets', ref => ref.where('SearchSubCategoryName', '>=', searchValue)
      .where('SearchSubCategoryName', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    })
  }

  getChartData(category:string, chartType:string) {
    var totalCost = 0;
    this.searchBudgetCategoryName(category.toLowerCase()).then(res => {
      //Get Budgets with filter
      res.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        switch(chartType) {
          case "Estimated": {
            totalCost += +data.EstimatedCost;
            break;
          }
          case "Actual": {
            break;
          }
          case "Deposit": {
            break;
          }
        }
      });   
      console.log("TOTAL Estimated: " + totalCost);      
      return totalCost;
    });    
  }

  getCeremonyRow(chart:string) {
    var budgetArray:(string|number)[];
    var totalCost = 0;
    //totalCost = this.getChartData("Ceremony",chart);
    console.log("Total COST AFTER: " + totalCost);
    budgetArray = ["Ceremony",totalCost];
    return budgetArray;
  }

  getReceptionRow(chart:string) {
    var budgetArray:(string|number)[];
    budgetArray = ["Reception",20];
    return budgetArray;
  }

  getStationaryRow(chart:string) {
    var budgetArray:(string|number)[];
    budgetArray = ["Stationary",1];
    return budgetArray;
  }

  getClothesRow(chart:string) {
    var budgetArray:(string|number)[];
    budgetArray = ["Clothes",5];
    return budgetArray;
  }

  getBeautyRow(chart:string) {
    var budgetArray:(string|number)[];
    budgetArray = ["Beauty",7];
    return budgetArray;
  }

  getFlowersRow(chart:string) {
    var budgetArray:(string|number)[];
    budgetArray = ["Flowers",5];
    return budgetArray;
  }

  getPhotoVideoRow(chart:string) {
    var budgetArray:(string|number)[];
    budgetArray = ["Photography/Videography",50];
    return budgetArray;
  }

  getMusicRow(chart:string) {
    var budgetArray:(string|number)[];
    budgetArray = ["Music",30];
    return budgetArray;
  }

  getRentalsRow(chart:string) {
    var budgetArray:(string|number)[];
    budgetArray = ["Rentals",10];
    return budgetArray;
  }

  getDecorRow(chart:string) {
    var budgetArray:(string|number)[];
    budgetArray = ["Decor",8];
    return budgetArray;
  }

  getMiscCelebrateRow(chart:string) {
    var budgetArray:(string|number)[];
    budgetArray = ["Misc. Celebrations",12];
    return budgetArray;
  }

  getGiftsFavorsRow(chart:string) {
    var budgetArray:(string|number)[];
    budgetArray = ["Gifts & Favors",4];
    return budgetArray;
  }

  getTransportationRow(chart:string) {
    var budgetArray:(string|number)[];
    budgetArray = ["Transportation",12];
    return budgetArray;
  }

  getOtherEntertainRow(chart:string) {
    var budgetArray:(string|number)[];
    budgetArray = ["Other Entertainment",20];
    return budgetArray;
  }

  getDestinationWeddingRow(chart:string) {
    var budgetArray:(string|number)[];
    budgetArray = ["Destination Wedding",6];
    return budgetArray;
  }

  getHoneymoonRow(chart:string) {
    var budgetArray:(string|number)[];
    budgetArray = ["Honeymoon",30];
    return budgetArray;
  }

  getMiscRow(chart:string) {
    var budgetArray:(string|number)[];
    budgetArray = ["Miscallenous",0];
    return budgetArray;
  }
}
