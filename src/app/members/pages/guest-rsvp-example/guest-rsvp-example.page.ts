import { Component, OnInit } from '@angular/core';
import { Rsvp, RsvpService } from 'src/app/services/rsvp.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import { Profile } from 'src/app/services/profile.service';
import { RsvpGuest, RsvpGuestService } from 'src/app/services/rsvp-guest.service';

@Component({
  selector: 'app-guest-rsvp-example',
  templateUrl: './guest-rsvp-example.page.html',
  styleUrls: ['./guest-rsvp-example.page.scss'],
})
export class GuestRsvpExamplePage implements OnInit {
  private rsvpsCollection: AngularFirestoreCollection<Rsvp>;

  constructor(
    db: AngularFirestore,
    private afAuth: AngularFireAuth) { 
      var authUser = this.afAuth.auth.currentUser;  
      this.rsvpsCollection  = db.collection<Profile>('profile').doc(authUser.uid).collection('weddingguests');
    }

  findRsvp: Rsvp = {
    Name: '',
    Email: '',
    PhoneNo: '',
    Address1: '',
    Address2: '',
    AddressCity: '',
    AddressState: '',
    AddressPostCode: '',
    UpdatedAt: 0,
    isGoing: false,
    NumberOfGuests: 0,
    CreatedAt: 0
  };

  ngOnInit() {
  }

  findRSVP() {
    console.log("RSVP GUEST NAME: " + this.findRsvp.Name);
    this.rsvpsCollection.ref.where("Name","==",this.findRsvp.Name)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if (doc.id != null) {
              console.log(doc.id, " => ", doc.data());
            } else {
              console.log("There is NO DATA HERE..");
            }            
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

}
