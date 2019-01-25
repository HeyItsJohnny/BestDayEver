import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Time } from '@angular/common';
import { Profile } from 'src/app/services/profile.service';
import { AngularFireAuth } from "angularfire2/auth";

export interface Event {
  id?: string;
  Subject: string;
  Description: string;
  StartDate: Date;
  EndDate: Date;
  StartEventTime: Time;
  EndEventTime: Time;
  UpdatedAt: number;
  CreatedAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  //private eventsCollection: AngularFirestoreCollection<Event>;
  private events: Observable<Event[]>;

  constructor(
    public db: AngularFirestore,
    private afAuth: AngularFireAuth) { 

    /*var authUser = this.afAuth.auth.currentUser;
    this.eventsCollection = db.collection<Profile>('profile').doc(authUser.uid).collection('events');
      
    this.events = this.eventsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );*/
  }

  /*getEvents() {
    return this.events;
  }*/

  getEvents() {
    var authUser = this.afAuth.auth.currentUser;

    return new Promise<any>((resolve, reject) => {
      this.db.collection<Profile>('profile').doc(authUser.uid).collection('events').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }
 
  getEvent(id) {
    var authUser = this.afAuth.auth.currentUser;
    let eventsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('events');
    return eventsCollection.doc<Event>(id).valueChanges();
  }
 
  updateEvent(event: Event, id: string) {
    var authUser = this.afAuth.auth.currentUser;
    let eventsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('events');
    return eventsCollection.doc(id).update(event);
  }
 
  addEvent(event: Event) {
    var authUser = this.afAuth.auth.currentUser;
    let eventsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('events');
    return eventsCollection.add(event);
  }

  updateEventStartDateTime(startDate: Date, startTime: Time, id: string) {
    var authUser = this.afAuth.auth.currentUser;
    let eventsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('events');
    eventsCollection.doc(id).update({"StartDate": startDate});
    eventsCollection.doc(id).update({"StartEventTime": startTime});
  }

  updateEventEndDateTime(endDate: Date, endTime: Time, id: string) {
    var authUser = this.afAuth.auth.currentUser;
    let eventsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('events');
    eventsCollection.doc(id).update({"EndDate": endDate});
    eventsCollection.doc(id).update({"EndEventTime": endTime});
  }
 
  removeEvent(id) {
    var authUser = this.afAuth.auth.currentUser;
    let eventsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('events');
    return eventsCollection.doc(id).delete();
  }
}
