import { Component, OnInit } from '@angular/core';
import { RsvpGuest, RsvpGuestService } from 'src/app/services/rsvp-guest.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-guest-details',
  templateUrl: './guest-details.page.html',
  styleUrls: ['./guest-details.page.scss'],
})
export class GuestDetailsPage implements OnInit {

  rsvpGuest: RsvpGuest = {
    Name: '',
    Email: '',
    PhoneNo: '',
    DinnerChoice: ''
  };

  rsvpGuestID = null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private rsvpGuestService: RsvpGuestService, 
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.rsvpGuestID = this.route.snapshot.params['id'];
    if (this.rsvpGuestID)  {
      this.loadRsvpGuest();
    }
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
}
