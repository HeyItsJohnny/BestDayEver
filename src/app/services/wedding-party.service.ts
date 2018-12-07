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
  private weddingPartysCollection: AngularFirestoreCollection<WeddingParty>;
  private weddingPartys: Observable<WeddingParty[]>;

  constructor(db: AngularFirestore) { 
    this.weddingPartysCollection = db.collection<WeddingParty>('weddingPartys');
 
    this.weddingPartys = this.weddingPartysCollection.snapshotChanges().pipe(
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
    return this.weddingPartys;
  }
 
  getWeddingParty(id) {
    return this.weddingPartysCollection.doc<WeddingParty>(id).valueChanges();
  }
 
  updateWeddingParty(weddingParty: WeddingParty, id: string) {
    return this.weddingPartysCollection.doc(id).update(weddingParty);
  }
 
  addWeddingParty(weddingParty: WeddingParty) {
    return this.weddingPartysCollection.add(weddingParty);
  }
 
  removeWeddingParty(id) {
    return this.weddingPartysCollection.doc(id).delete();
  }
}
