import { Component, OnInit } from '@angular/core';
import { Rsvp, RsvpService } from 'src/app/services/rsvp.service';
import { RsvpGuest, RsvpGuestService } from 'src/app/services/rsvp-guest.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import { Profile } from 'src/app/services/profile.service';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Events } from 'ionic-angular';
import { resolve } from 'q';
import { Dinner, DinnerService } from 'src/app/services/dinner.service';

@Component({
  selector: 'app-guest-rsvp-example',
  templateUrl: './guest-rsvp-example.page.html',
  styleUrls: ['./guest-rsvp-example.page.scss'],
})
export class GuestRsvpExamplePage implements OnInit {
  private rsvpsCollection: AngularFirestoreCollection<Rsvp>;
  rsvps: Rsvp[];
  dinners: Dinner[];

  constructor(
    db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private loadingController: LoadingController,
    public alertController: AlertController,
    private rsvpService: RsvpService,
    private rsvpGuestService: RsvpGuestService,
    private dinnerService: DinnerService,
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

  rsvpGuest: RsvpGuest = {
    Name: '',
    Email: '',
    PhoneNo: '',
    DinnerChoice: '',
    DinnerChoiceText: ''
  };


  ngOnInit() {
    this.dinnerService.getDinners().subscribe(res => {
      this.dinners = res;
    });
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
    var test = this.rsvpService.getRsvpFromSearch(this.findRsvp.Name).subscribe(res => {
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
          test.unsubscribe();   //You need to unsubscribe!!!
          return rsvp;          
        });
      }      
    });
  }

  showAttendingAlert(DocSetID: string, NumOfGuests: number, RSVPName: string)
  {    
    this.alertController.create({
      header: "Hello " + RSVPName + "!",
      message: "Will you be attending?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.rsvpService.setRsvpAttendance(DocSetID,true);
            this.startRSVPGuestInput(DocSetID,NumOfGuests);
          }
        }, {
          text: 'No',
          handler: () => {
            this.rsvpService.setRsvpAttendance(DocSetID,false);
          }
        }
      ]
    }).then(alert => alert.present())
  }

  async startRSVPGuestInput(DocSetID: string, NumOfGuests: number) {
    for(var i = 1; i <= NumOfGuests; i++) {
      this.createRSVPGuest();      
    }
  }

  createRSVPGuest() {
    this.alertController.create({
      header: "Enter Guest Information",
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
          handler: (data: any) => {
            this.rsvpGuest.Email = data.guestEmail;
            this.rsvpGuest.Name = data.guestName;
            this.rsvpGuest.PhoneNo = data.guestPhoneNo;
            this.events.publish('guest:created', this.getRsvp.id);
            this.rsvpGuestService.addRsvpGuest(this.rsvpGuest).then(docRef => {
              this.rsvpGuest.id = docRef.id;
              this.setDinnerSelection();
            });
          }
        }
      ]
    }).then(alert => alert.present())
  }

  async setDinnerSelection() {
    var options = {
      header: "Dinner Selection",
      subHeader: "Please select a dinner",
      inputs: [],
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
          handler: (data: any) => {
            console.log('Data: ' + data);
            this.rsvpGuestService.updateRsvpGuestDinnerChoiceText(this.getDinnerString(data),this.rsvpGuest.id);
            this.rsvpGuestService.updateRsvpGuestDinnerChoice(data,this.rsvpGuest.id).then(function() {
              console.log("Dinner Choice successfully updated!");
            });           
          }
        }
      ]
    };

    for (let item of this.dinners) {
      options.inputs.push({ name : item.Name, value: item.id , label: item.Name, type: 'radio'});
    }
    
    let alert = await this.alertController.create(options);
    await alert.present();
  }

  getDinnerString(dinnerID: string) {
    for (let item of this.dinners) {
      if (item.id == dinnerID) {
        return item.Name;
      }
    }
    return "";
  }

  /*async createRSVPGuest(GuestNo: number) {
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
          handler: (data: any) => {
            this.rsvpGuest.Email = data.guestEmail;
            this.rsvpGuest.Name = data.guestName;
            this.rsvpGuest.PhoneNo = data.guestPhoneNo;
            this.events.publish('guest:created', this.getRsvp.id);
            this.rsvpGuestService.addRsvpGuest(this.rsvpGuest).then(docRef => {
              this.rsvpGuest.id = docRef.id;
            });
          }
        }
      ]
    });
    await alert.present();
  }*/

  async presentAlert(headerStr: string, messageStr: string) {
    const alert = await this.alertController.create({
      header: headerStr,
      message: messageStr,
      buttons: ['OK']
    });
    await alert.present();
  }

}
