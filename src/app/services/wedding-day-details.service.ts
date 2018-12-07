import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface WeddingDayDetails {
  id: string;
  WeddingPartyGroupdID: string;
  WeddingDate: Date;
  EstimatedNoOfGuests: number;
  GroomName: string;
  BrideName: string;
  WeddingInvitesSentOut: boolean;
  UpdatedAt: number;
  CreatedAt: number;
}

@Injectable({
  providedIn: 'root'
})

export class WeddingDayDetailsService {
  private weddingDaysCollection: AngularFirestoreCollection<WeddingDayDetails>;
  private weddingDays: Observable<WeddingDayDetails[]>;

  constructor(db: AngularFirestore) { 
    this.weddingDaysCollection = db.collection<WeddingDayDetails>('weddingDayDetails');
 
    this.weddingDays = this.weddingDaysCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getWeddingDay(id) {
    return this.weddingDaysCollection.doc<WeddingDayDetails>(id).valueChanges();
  }
 
  updateWeddingday(weddingParty: WeddingDayDetails, id: string) {
    return this.weddingDaysCollection.doc(id).update(weddingParty);
  }
 
  addWeddingDay(weddingParty: WeddingDayDetails) {
    return this.weddingDaysCollection.add(weddingParty);
  }
 
  removeWeddingDay(id) {
    return this.weddingDaysCollection.doc(id).delete();
  }
}
