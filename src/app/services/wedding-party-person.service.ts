import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from 'src/app/services/profile.service';
import { AngularFireAuth } from "angularfire2/auth";
import { ActivatedRoute } from '@angular/router';
import { Events } from 'ionic-angular';

export interface WeddingPartyPerson {
  id?: string;
  Name: string;
  Email: string;
  PhoneNo: string;
  DinnerChoice: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeddingPartyPersonService {
  private weddingPartyPersonCollection: AngularFirestoreCollection<WeddingPartyPerson>;
  private weddingPartyPerson: Observable<WeddingPartyPerson[]>;
  public weddingPartyPersonId: any;

  constructor(
    db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    public events: Events) { 
    this.events.subscribe('weddingperson:created', set => {
      var authUser = this.afAuth.auth.currentUser;
      this.weddingPartyPersonId = set;
      this.weddingPartyPersonCollection  = db.collection<Profile>('profile').doc(authUser.uid).collection('weddingparty').doc(this.weddingPartyPersonId).collection('weddingpartyperson');

      this.weddingPartyPerson = this.weddingPartyPersonCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }); 
  }
  
  getWeddingPartyPersons() {
    return this.weddingPartyPerson;
  }
 
  getWeddingPartyPerson(id) {
    return this.weddingPartyPersonCollection.doc<WeddingPartyPerson>(id).valueChanges();
  }
 
  updateWeddingPartyPerson(weddingPartyPerson: WeddingPartyPerson, id: string) {
    return this.weddingPartyPersonCollection.doc(id).update(weddingPartyPerson);
  }
 
  addWeddingPartyPerson(weddingPartyPerson: WeddingPartyPerson) {
    return this.weddingPartyPersonCollection.add(weddingPartyPerson);
  }
 
  removeWeddingPartyPerson(id) {
    return this.weddingPartyPersonCollection.doc(id).delete();
  }
}
