import { Injectable, Optional } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface WeddingParty {
  id?: string;
  Name: string;
  Email: string;
  PhoneNo: string;
  WeddingSide: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeddingPartyService {
  private weddingPartyCollection: AngularFirestoreCollection<WeddingParty>;
  private weddingParty: Observable<WeddingParty[]>;

  constructor(db: AngularFirestore) { 
    this.weddingPartyCollection = db.collection<WeddingParty>('weddingParty');
 
    this.weddingParty = this.weddingPartyCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getWeddingPartys() {
    return this.weddingParty;
  }
 
  getWeddingParty(id) {
    return this.weddingPartyCollection.doc<WeddingParty>(id).valueChanges();
  }
 
  updateWeddingParty(weddingParty: WeddingParty, id: string) {
    return this.weddingPartyCollection.doc(id).update(weddingParty);
  }
 
  addWeddingParty(weddingParty: WeddingParty) {
    return this.weddingPartyCollection.add(weddingParty);
  }
 
  removeWeddingParty(id) {
    return this.weddingPartyCollection.doc(id).delete();
  }

}
