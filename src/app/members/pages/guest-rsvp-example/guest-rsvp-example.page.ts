import { Component, OnInit } from '@angular/core';
import { Rsvp, RsvpService } from 'src/app/services/rsvp.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import { Profile } from 'src/app/services/profile.service';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { query } from '@angular/core/src/render3';

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
  }

  getRSVP() {
    console.log("RSVP NAME TO FIND:: " + this.findRsvp.Name);
    this.rsvpsCollection.ref.where("Name","==",this.findRsvp.Name)
    .limit(1)
    .get()
    .then(function(querySnapshot) {
      if (querySnapshot.empty) {
        console.log("No Documents Found.");
      } else {
        querySnapshot.forEach(function(doc) {
          var data = doc.data();
          var GroupName = data.Name;
          var GroupEmail = data.Email;
          var NumberOfRSVPS = data.NumberOfGuests;
          console.log("Group ID: " + doc.id + " Group NAME: " + GroupName + " Group EMAIL: " + GroupEmail + " Number of Guests: " + NumberOfRSVPS);

        });
      }
    })
    .catch(function(error) {
        //console.log("RETURN NOTHING..");
    });
  }

  async createRSVPGuest(DocumentID: string, RSVPNum: number)
  {
    console.log("Document ID: " + DocumentID + " RSVP Number: " + RSVPNum);
    /*const alert = this.alertController.create({
      header: 'Prompt!',
      inputs: [
        {
          name: 'RSVPName',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: 'RSVPEmail',
          type: 'text',
          placeholder: 'Email'
        },
        {
          name: 'RSVPPhoneNo',
          type: 'text',
          placeholder: 'Phone No.'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present(); */
  }

  
  /*async getRSVP2(DocID: string) {
    this.rsvpService.getRsvp(DocID).subscribe(res => {
      this.getRsvp = res;
      console.log("FOUND RSVP NAME!!!! " + this.getRsvp.Name);
    });
  }*/
}
