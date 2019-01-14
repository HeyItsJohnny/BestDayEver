import { Component, OnInit } from '@angular/core';
import { RsvpGuest, RsvpGuestService } from 'src/app/services/rsvp-guest.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { Dinner, DinnerService } from 'src/app/services/dinner.service';

@Component({
  selector: 'app-guest-details',
  templateUrl: './guest-details.page.html',
  styleUrls: ['./guest-details.page.scss'],
})
export class GuestDetailsPage implements OnInit {

  dinners: Dinner[];

  rsvpGuest: RsvpGuest = {
    Name: '',
    DinnerNotes: '',
    DinnerChoice: '',
    DinnerChoiceText: ''
  };


  rsvpGuestID = null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private rsvpGuestService: RsvpGuestService, 
    private loadingController: LoadingController,
    private router: Router,
    private alertController: AlertController,
    private dinnerService: DinnerService) { }

  ngOnInit() {
    this.rsvpGuestID = this.route.snapshot.params['id'];
    if (this.rsvpGuestID)  {
      this.loadRsvpGuest();
    }
    var dinnerservice = this.dinnerService.getDinners().subscribe(res => {
      this.dinners = res;
      dinnerservice.unsubscribe();
    });
  }

  async loadRsvpGuest() {   
    const loading = await this.loadingController.create({
      message: 'Loading RSVP Guest..'
    });
    await loading.present();
 
    this.rsvpGuestService.getRsvpGuest(this.rsvpGuestID).subscribe(res => {
      loading.dismiss();
      this.rsvpGuest = res;
    });
  }

  async saveRsvpGuest() {
    const loading = await this.loadingController.create({
      message: 'Saving RSVP Guest..'
    });
    await loading.present();
 
    if (this.rsvpGuestID) {
      this.rsvpGuestService.updateRsvpGuest(this.rsvpGuest, this.rsvpGuestID).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    } else {
      this.rsvpGuestService.addRsvpGuest(this.rsvpGuest).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    }
  }

  async goToDinnerSelection() {
    this.saveRsvp();
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
            this.rsvpGuestService.updateRsvpGuestDinnerChoiceText(this.getDinnerString(data),this.rsvpGuestID);
            this.rsvpGuestService.updateRsvpGuestDinnerChoice(data,this.rsvpGuestID).then(function() {
              console.log("Dinner Choice successfully updated!");
            });           
          }
        }
      ]
    };

    for (let item of this.dinners) {
      options.inputs.push({ name : item.Name, value: item.id , label: item.Name, type: 'radio', checked: this.setTheInputCheck(item.id)});
    }
    
    let alert = await this.alertController.create(options);
    await alert.present();
  }

  setTheInputCheck(dinnerID: string){
    if (dinnerID == this.rsvpGuest.DinnerChoice) {
      return true;
    } else {
      return false;
    }
  }

  getDinnerString(dinnerID: string) {
    for (let item of this.dinners) {
      if (item.id == dinnerID) {
        return item.Name;
      }
    }
    return "";
  }

  saveRsvp() {
    if (this.rsvpGuestID ) {
      this.rsvpGuestService.updateRsvpGuest(this.rsvpGuest, this.rsvpGuestID).then(docRef => {
      });
    } else {
      this.rsvpGuestService.addRsvpGuest(this.rsvpGuest).then(docRef => {
        this.rsvpGuestID = docRef.id;
      });
    }
  }
}
