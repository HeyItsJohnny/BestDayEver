import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from 'src/app/services/profile.service';
import { AngularFireAuth } from "angularfire2/auth";

export interface Rsvp {
  id?: string;
  Name: string;
  Email: string;
  PhoneNo: string;
  Address1: string;
  Address2: string;
  AddressCity: string;
  AddressState: string;
  AddressPostCode: string;
  NumberOfGuests: number;
  CoupleNotes: string;
  isGoing: Boolean;
  UpdatedAt: number;
  CreatedAt: number;
}

@Injectable({
  providedIn: 'root'
})

export class RsvpService {
  private rsvpsCollection: AngularFirestoreCollection<Rsvp>;
  private rsvps: Observable<Rsvp[]>;

  constructor(
    public db: AngularFirestore,
    private afAuth: AngularFireAuth) { 
    var authUser = this.afAuth.auth.currentUser;
    this.rsvpsCollection  = db.collection<Profile>('profile').doc(authUser.uid).collection('weddingguests');

    this.rsvps = this.rsvpsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getRsvps() {
    return this.rsvps;
  }
 
  getRsvp(id) {
    return this.rsvpsCollection.doc<Rsvp>(id).valueChanges();
  }
 
  updateRsvp(rsvp: Rsvp, id: string) {
    return this.rsvpsCollection.doc(id).update(rsvp);
  }
 
  addRsvp(rsvp: Rsvp) {
    return this.rsvpsCollection.add(rsvp);
  }

  getRsvpFromSearch(NameToSearch: string) {
    var authUser = this.afAuth.auth.currentUser;
    return this.db.collection<Profile>('profile').doc(authUser.uid).collection<Rsvp>('weddingguests', ref => ref.where('Name', '==', NameToSearch).limit(1)).snapshotChanges();
  }

  updateRsvpAttendance(id: string, isGoingBool: boolean){
    this.rsvpsCollection.doc(id).update({"isGoing": isGoingBool});
  }

  updateRsvpInformation(id: string, rsvpEmail: string, rsvpPhoneNo: string){
    this.rsvpsCollection.doc(id).update({"Email": rsvpEmail});
    this.rsvpsCollection.doc(id).update({"PhoneNo": rsvpPhoneNo});
  }

  updateRsvpCoupleNote(id: string, CoupleNotes: String){
    this.rsvpsCollection.doc(id).update({"CoupleNotes": CoupleNotes});
  }
 
  removeRsvp(id) {
    return this.rsvpsCollection.doc(id).delete();
  }

}
