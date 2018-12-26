import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(db: AngularFirestore) { 
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

  /*getProfiles() {
    return this.profile;
  }*/
 
  getProfile(id) {
    return this.profilesCollection.doc<Profile>(id).valueChanges();
  }
 
  updateProfile(prof: Profile, id: string) {
    return this.profilesCollection.doc(id).update(prof);
  }
 
  addProfile(prof: Profile) {
    return this.profilesCollection.add(prof);
  }
 
  /*removeProfile(id) {
    return this.profilesCollection.doc(id).delete();
  }*/
}
