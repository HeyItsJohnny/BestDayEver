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
  public rsvpId: any;


  constructor(
    db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    public events: Events) { 

    
    this.events.subscribe('set:changed', set => {
      var authUser = this.afAuth.auth.currentUser;
      this.rsvpId = set;
      this.rsvpGuestCollection  = db.collection<Profile>('profile').doc(authUser.uid).collection('weddingguests').doc(this.rsvpId).collection('guest');

      this.rsvpGuest = this.rsvpGuestCollection.snapshotChanges().pipe(
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

  setAttendanceSet(set: any) {
    this.rsvpId = set;
  }

  getRsvpGuests(rsvpID: string) {
    //this.currentRSVP = rsvpID;
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
