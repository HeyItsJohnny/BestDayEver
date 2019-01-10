import { Component, OnInit } from '@angular/core';
import { Rsvp, RsvpService } from 'src/app/services/rsvp.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import { Profile } from 'src/app/services/profile.service';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Events } from 'ionic-angular';
import { resolve } from 'q';

@Component({
  selector: 'app-guest-rsvp-example',
  templateUrl: './guest-rsvp-example.page.html',
  styleUrls: ['./guest-rsvp-example.page.scss'],
})
export class GuestRsvpExamplePage implements OnInit {
  private rsvpsCollection: AngularFirestoreCollection<Rsvp>;
  rsvps: Rsvp[];

  constructor(
    db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private loadingController: LoadingController,
    public alertController: AlertController,
    private rsvpService: RsvpService,
    public events: Events) { 
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

  findRSVPRecord() {
    console.log("BEFORE SUBSCIRPTION..");
    if (this.findRsvp.Name == "") {
      this.presentAlert("Error","Please enter in the Name on the RSVP.");
    } else {
      this.getRSVPrecord();
    }
  }

  getRSVPrecord() {
    this.rsvpService.getRsvpFromSearch(this.findRsvp.Name).subscribe(res => {
      if (res.length == 0) {
        this.presentAlert("Error","RSVP was not found. Please try another name.");
      } else {
        this.rsvps = res.map(a => {
          const rsvp: Rsvp = a.payload.doc.data() as Rsvp;
          rsvp.id = a.payload.doc.id;
          this.getRsvp.id = rsvp.id;
          this.getRsvp.Name = rsvp.Name;
          this.getRsvp.Email = rsvp.Email;
          this.getRsvp.NumberOfGuests = rsvp.NumberOfGuests;
          this.showAttendingAlert(rsvp.id,rsvp.NumberOfGuests, rsvp.Name);
          return rsvp;          
        });
      }      
    });
  }

  showAttendingAlert(DocSetID: string, NumOfGuests: number, RSVPName: string)
  {    
    this.attendingConfirm(DocSetID,NumOfGuests,RSVPName).then((result) => {
      if(result){
        this.rsvpService.setRsvpAttendance(DocSetID,true);
      } else {
        this.rsvpService.setRsvpAttendance(DocSetID,false);
      }
    })
    /*this.alertController.create({
      header: "Hello " + RSVPName + "!",
      message: "Will you be attending?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.rsvpService.setRsvpAttendance(DocSetID,true);
          }
        }, {
          text: 'No',
          handler: () => {
            this.rsvpService.setRsvpAttendance(DocSetID,false);
          }
        }
      ]
    }).then(alert => alert.present())*/
  }

  attendingConfirm(DocSetID: string, NumOfGuests: number, RSVPName: string) {
    return new Promise((resolve, reject) =>{
      const confirm = this.alertController.create({
        header : "Hello " + RSVPName + "!",
        message: "Will you be attending?",
        buttons: [
          {
            text: 'Yes',
            handler:_=> resolve(true)
          },
          {
            text: 'No',
            handler:_=> resolve(false)
          }
        ]
      }).then(alert => alert.present())
    })
  }

  async startRSVPGuestInput(DocSetID: string, NumOfGuests: number) {
    this.delay(1000).then(any=>{
      for(var i = 1; i <= NumOfGuests; i++) {
        //console.log("Num: " + i +" DOC SET: " + DocSetID);
        this.createRSVPGuest(DocSetID, i);
      }
    });
    this.rsvpService.setRsvpAttendance(DocSetID,true);
  }

  async createRSVPGuest(DocSetID: string, GuestNo: number) {
    const alert = await this.alertController.create({
      header: "Enter Guest " + GuestNo + " Information",
      inputs: [
        {
          name: 'guestName',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: 'guestEmail',
          type: 'text',
          placeholder: 'Email'
        },
        {
          name: 'guestPhoneNo',
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
    await alert.present();
  }

  async presentAlert(headerStr: string, messageStr: string) {
    const alert = await this.alertController.create({
      header: headerStr,
      message: messageStr,
      buttons: ['OK']
    });
    await alert.present();
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}

}
