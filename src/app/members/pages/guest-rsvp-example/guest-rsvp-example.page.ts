import { Component, OnInit } from '@angular/core';
import { Rsvp, RsvpService } from 'src/app/services/rsvp.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import { Profile } from 'src/app/services/profile.service';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-guest-rsvp-example',
  templateUrl: './guest-rsvp-example.page.html',
  styleUrls: ['./guest-rsvp-example.page.scss'],
})
export class GuestRsvpExamplePage implements OnInit {
  private rsvpsCollection: AngularFirestoreCollection<Rsvp>;

  constructor(
    db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private loadingController: LoadingController,
    public alertController: AlertController,
    private rsvpService: RsvpService) { 
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

  getRsvp: Rsvp = {
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
    this.getRSVP();
    //console.log("RSVP!!! " + test);
  }

  getRSVP() {
    console.log("RSVP NAME TO FIND:: " + this.findRsvp.Name);
    this.rsvpsCollection.ref.where("Name","==",this.findRsvp.Name)
    .limit(1)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log("DOC ID: " + doc.id);
          //console.log(doc.id, " => ", doc.data());
          this.getRsvp = doc.data();
          console.log("GET RSVP OBJECT!!!");
          console.log(this.getRsvp);
          //return doc.id;
        });
    })
    .catch(function(error) {
        //console.log("RETURN NOTHING..");
    });
  }

  /*async getRSVP2(DocID: string) {
    this.rsvpService.getRsvp(DocID).subscribe(res => {
      this.getRsvp = res;
      console.log("FOUND RSVP NAME!!!! " + this.getRsvp.Name);
    });
  }*/
}
