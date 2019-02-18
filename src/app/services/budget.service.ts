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

  getAllChartData(chartType:string) {
    return this.getBudgets().then(events => {
      var singlecost = events.map(a => {
        var allCost = 0;
        const data = a.payload.doc.data();
        switch(chartType) {
          case "Estimated": {
            allCost += +data.EstimatedCost;
            break;
          }
          case "Actual": {
            allCost += +data.ActualCost;
            break;
          }
          case "Deposit": {
            allCost += +data.Deposit;
            break;
          }
        }
        return {
          SingleCost: allCost
        }
      });
      var y = 0;
      for (let x of singlecost) {
        y += +x.SingleCost;
      }
      return {
        TotalCost: y
      }
    });
  }

  getChartData(category:string, chartType:string) {
    return this.searchBudgetCategoryName(category.toLowerCase()).then(res => {
      var singlecost = res.map(a => {
        var tmpcost = 0;
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        switch(chartType) {
          case "Estimated": {
            tmpcost += +data.EstimatedCost;
            break;
          }
          case "Actual": {
            tmpcost += +data.ActualCost;
            break;
          }
          case "Deposit": {
            tmpcost += +data.Deposit;
            break;
          }
        }
        return {
          SingleCost: tmpcost
        }
      });  
      var y = 0;
      for (let x of singlecost) {
        y += +x.SingleCost;
      }
      return {
        TotalCost: y
      }
    });    
  }
}
