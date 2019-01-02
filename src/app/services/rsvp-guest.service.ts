import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from 'src/app/services/profile.service';
import { AngularFireAuth } from "angularfire2/auth";

export interface RsvpGuest {
  id?: string;
  Name: string;
  Email: string;
  PhoneNo: string;
  DinnerChoice: string;
}

@Injectable({
  providedIn: 'root'
})
export class RsvpGuestService {
  private rsvpGuestCollection: AngularFirestoreCollection<RsvpGuest>;
  private rsvpGuest: Observable<RsvpGuest[]>;

  constructor(
    db: AngularFirestore,
    private afAuth: AngularFireAuth) { 

      var authUser = this.afAuth.auth.currentUser;
      var currentRSVP = '';   //Get Current RSVP

      this.rsvpGuestCollection  = db.collection<Profile>('profile').doc(authUser.uid).collection('weddingguests').doc(currentRSVP).collection('guest');
  
      this.rsvpGuest = this.rsvpGuestCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getRsvpGuests() {
    return this.rsvpGuest;
  }
 
  getRsvpGuest(id) {
    return this.rsvpGuestCollection.doc<RsvpGuest>(id).valueChanges();
  }
 
  updateRsvpGuest(rsvpGuest: RsvpGuest, id: string) {
    return this.rsvpGuestCollection.doc(id).update(rsvpGuest);
  }
 
  addRsvpGuest(rsvpGuest: RsvpGuest) {
    return this.rsvpGuestCollection.add(rsvpGuest);
  }
 
  removeRsvpGuest(id) {
    return this.rsvpGuestCollection.doc(id).delete();
  }
}
