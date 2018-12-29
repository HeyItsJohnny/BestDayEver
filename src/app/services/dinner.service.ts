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
    db: AngularFirestore,
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

  getDinners() {
    return this.dinners;
  }
 
  getDinner(id) {
    return this.dinnersCollection.doc<Dinner>(id).valueChanges();
  }
 
  updateDinner(dinner: Dinner, id: string) {
    return this.dinnersCollection.doc(id).update(dinner);
  }
 
  addDinner(dinner: Dinner) {
    return this.dinnersCollection.add(dinner);
  }
 
  removeDinner(id) {
    return this.dinnersCollection.doc(id).delete();
  }
}
