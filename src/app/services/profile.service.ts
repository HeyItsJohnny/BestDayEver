import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from "angularfire2/auth";

export interface Profile {
  id?: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phoneno: string;
  WeddingID: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profilesCollection: AngularFirestoreCollection<Profile>;
  private profile: Observable<Profile[]>;

  constructor(
    db: AngularFirestore,
    private afAuth: AngularFireAuth) { 
    this.profilesCollection = db.collection<Profile>('profile');
 
    this.profile = this.profilesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getProfile() {
    var authUser = this.afAuth.auth.currentUser;
    return this.profilesCollection.doc<Profile>(authUser.uid).valueChanges();
  }
 
  updateProfile(prof: Profile, id: string) {
    return this.profilesCollection.doc(id).update(prof);
  }
 
  addProfile(prof: Profile) {
    return this.profilesCollection.add(prof);
  }

  addWeddingID(WeddingIDStr: string){
    var authUser = this.afAuth.auth.currentUser;
    return this.profilesCollection.doc(authUser.uid).update({WeddingID: WeddingIDStr});
  }

  addWeddingIDWithID(WeddingIDStr: string, userid: string){
    return this.profilesCollection.doc(userid).update({WeddingID: WeddingIDStr});
  }
}
