import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Time } from '@angular/common';

export interface Dinner {
  id?: string;
  Name: string;
  Description: string;
  DinnerType: string;
  DisplayOrder: number;
  DinnerTime: Time;
  DinnerDate: Date;
  UpdatedAt: number;
  CreatedAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class DinnerService {
  private dinnersCollection: AngularFirestoreCollection<Dinner>;
  private dinners: Observable<Dinner[]>;

  constructor(db: AngularFirestore) { 
    this.dinnersCollection = db.collection<Dinner>('dinners');
 
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
