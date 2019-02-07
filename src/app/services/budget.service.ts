import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Time } from '@angular/common';
import { Profile } from 'src/app/services/profile.service';
import { AngularFireAuth } from "angularfire2/auth";

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
}
