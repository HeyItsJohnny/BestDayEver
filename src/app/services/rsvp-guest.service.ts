import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from 'src/app/services/profile.service';
import { AngularFireAuth } from "angularfire2/auth";
import { ActivatedRoute } from '@angular/router';
import { Events } from 'ionic-angular';

export interface RsvpGuest {
  id?: string;
  Name: string;
  DinnerChoice: string;
  DinnerChoiceText: string;
  DinnerNotes: string;
}

@Injectable({
  providedIn: 'root'
})
export class RsvpGuestService {
  public rsvpId: any;
  private rsvpGuestsCollection: AngularFirestoreCollection<RsvpGuest>;
  private rsvpGuests: Observable<RsvpGuest[]>;

  constructor(
    public db: AngularFirestore,
    private afAuth: AngularFireAuth,
    public events: Events) { 
    this.events.subscribe('guest:created', set => {
      this.rsvpId = set;
      var authUser = this.afAuth.auth.currentUser;
      this.rsvpGuestsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('rsvps').doc(this.rsvpId).collection('guests');

      this.rsvpGuests= this.rsvpGuestsCollection.snapshotChanges().pipe(
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

  getRsvpGuestsForSearch() {
    return this.rsvpGuests;
  }

  getRsvpGuests() {
    var authUser = this.afAuth.auth.currentUser;

    return new Promise<any>((resolve, reject) => {
      this.db.collection<Profile>('profile').doc(authUser.uid).collection('rsvps').doc(this.rsvpId).collection('guests').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }
 
  getRsvpGuest(id) {
    var authUser = this.afAuth.auth.currentUser;
    let rsvpGuestCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('rsvps').doc(this.rsvpId).collection('guests');
    return rsvpGuestCollection.doc<RsvpGuest>(id).valueChanges();
  }
 
  updateRsvpGuest(rsvpGuest: RsvpGuest, id: string) {
    var authUser = this.afAuth.auth.currentUser;
    let rsvpGuestCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('rsvps').doc(this.rsvpId).collection('guests');
    return rsvpGuestCollection.doc(id).update(rsvpGuest);
  }

  updateRsvpGuestDinnerChoice(dinnerChoiceID: string, id: string) {
    var authUser = this.afAuth.auth.currentUser;
    let rsvpGuestCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('rsvps').doc(this.rsvpId).collection('guests');
    return rsvpGuestCollection.doc(id).update({"DinnerChoice": dinnerChoiceID});
  }

  updateRsvpGuestDinnerChoiceText(dinnerChoiceText: string, id: string) {
    var authUser = this.afAuth.auth.currentUser;
    let rsvpGuestCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('rsvps').doc(this.rsvpId).collection('guests');
    return rsvpGuestCollection.doc(id).update({"DinnerChoiceText": dinnerChoiceText});
  }

  updateRsvpGuestDietaryRestrictions(dinnerNotes: string, id: string) {
    var authUser = this.afAuth.auth.currentUser;
    let rsvpGuestCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('rsvps').doc(this.rsvpId).collection('guests');
    return rsvpGuestCollection.doc(id).update({"DinnerNotes": dinnerNotes});
  }
 
  addRsvpGuest(rsvpGuest: RsvpGuest) {
    var authUser = this.afAuth.auth.currentUser;
    let rsvpGuestCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('rsvps').doc(this.rsvpId).collection('guests');
    return rsvpGuestCollection.add(rsvpGuest);
  }
 
  removeRsvpGuest(id) {
    var authUser = this.afAuth.auth.currentUser;
    let rsvpGuestCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('rsvps').doc(this.rsvpId).collection('guests');
    return rsvpGuestCollection.doc(id).delete();
  }
}
