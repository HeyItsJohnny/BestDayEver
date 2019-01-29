import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from 'src/app/services/profile.service';
import { AngularFireAuth } from "angularfire2/auth";

export interface Dinner {
  id?: string;
  Name: string;
  Description: string;
  DisplayOrder: number;
  UpdatedAt: number;
  CreatedAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class DinnerService {
  private dinnersCollection: AngularFirestoreCollection<Dinner>;
  private dinners: Observable<Dinner[]>;

  constructor(
    public db: AngularFirestore,
    private afAuth: AngularFireAuth) { 
        
      var authUser = this.afAuth.auth.currentUser;
      this.dinnersCollection = db.collection<Profile>('profile').doc(authUser.uid).collection('dinners');

      this.dinners = this.dinnersCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }

  getDinnersToDisplay() {
    return this.dinners;
  }

  getDinners() {
    var authUser = this.afAuth.auth.currentUser;

    return new Promise<any>((resolve, reject) => {
      this.db.collection<Profile>('profile').doc(authUser.uid).collection('dinners').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }
 
  getDinner(id) {
    var authUser = this.afAuth.auth.currentUser;
    let dinnersCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('dinners');
    return dinnersCollection.doc<Dinner>(id).valueChanges();
  }
 
  updateDinner(dinner: Dinner, id: string) {
    var authUser = this.afAuth.auth.currentUser;
    let dinnersCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('dinners');
    return dinnersCollection.doc(id).update(dinner);
  }
 
  addDinner(dinner: Dinner) {
    var authUser = this.afAuth.auth.currentUser;
    let dinnersCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('dinners');
    return dinnersCollection.add(dinner);
  }
 
  removeDinner(id) {
    var authUser = this.afAuth.auth.currentUser;
    let dinnersCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('dinners');
    return dinnersCollection.doc(id).delete();
  }
}
