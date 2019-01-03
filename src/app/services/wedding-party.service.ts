import { Injectable, Optional } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from 'src/app/services/profile.service';
import { AngularFireAuth } from "angularfire2/auth";

export interface WeddingParty {
  id?: string;
  Name: string;
  WeddingSide: string;
}

@Injectable({
  providedIn: 'root'
})

export class WeddingPartyService {
  private weddingPartysCollection: AngularFirestoreCollection<WeddingParty>;
  private weddingPartys: Observable<WeddingParty[]>;

  constructor(
    db: AngularFirestore,
    private afAuth: AngularFireAuth) { 

    var authUser = this.afAuth.auth.currentUser;
    this.weddingPartysCollection = db.collection<Profile>('profile').doc(authUser.uid).collection('weddingparty');

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
