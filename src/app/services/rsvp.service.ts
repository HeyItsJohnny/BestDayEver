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
  ThankYouLetterSent: boolean
  isGoing: Boolean;
  UpdatedAt: number;
  CreatedAt: number;
}

@Injectable({
  providedIn: 'root'
})

export class RsvpService {

  constructor(
    public db: AngularFirestore,
    private afAuth: AngularFireAuth) { }

  getRsvps() {
    var authUser = this.afAuth.auth.currentUser;

    return new Promise<any>((resolve, reject) => {
      this.db.collection<Profile>('profile').doc(authUser.uid).collection('rsvps').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }
 
  getRsvp(id) {
    var authUser = this.afAuth.auth.currentUser;
    let rsvpsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('rsvps');
    return rsvpsCollection.doc<Rsvp>(id).valueChanges();
  }
 
  updateRsvp(rsvp: Rsvp, id: string) {
    var authUser = this.afAuth.auth.currentUser;
    let rsvpsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('rsvps');
    return rsvpsCollection.doc(id).update(rsvp);
  }
 
  addRsvp(rsvp: Rsvp) {
    var authUser = this.afAuth.auth.currentUser;
    let rsvpsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('rsvps');
    return rsvpsCollection.add(rsvp);
  }

  getRsvpFromSearch(NameToSearch: string) {
    var authUser = this.afAuth.auth.currentUser;
    return this.db.collection<Profile>('profile').doc(authUser.uid).collection<Rsvp>('weddingguests', ref => ref.where('Name', '==', NameToSearch).limit(1)).snapshotChanges();
  }

  updateRsvpAttendance(id: string, isGoingBool: boolean){
    var authUser = this.afAuth.auth.currentUser;
    let rsvpsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('rsvps');
    rsvpsCollection.doc(id).update({"isGoing": isGoingBool});
  }

  updateRsvpInformation(id: string, rsvpEmail: string, rsvpPhoneNo: string){
    var authUser = this.afAuth.auth.currentUser;
    let rsvpsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('rsvps');
    rsvpsCollection.doc(id).update({"Email": rsvpEmail});
    rsvpsCollection.doc(id).update({"PhoneNo": rsvpPhoneNo});
  }

  updateRsvpCoupleNote(id: string, CoupleNotes: String){
    var authUser = this.afAuth.auth.currentUser;
    let rsvpsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('rsvps');
    rsvpsCollection.doc(id).update({"CoupleNotes": CoupleNotes});
  }
 
  removeRsvp(id) {
    var authUser = this.afAuth.auth.currentUser;
    let rsvpsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('rsvps');
    return rsvpsCollection.doc(id).delete();
  }

}
