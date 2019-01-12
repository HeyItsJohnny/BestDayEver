import { Rsvp, RsvpService } from 'src/app/services/rsvp.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rsvp-details',
  templateUrl: './rsvp-details.page.html',
  styleUrls: ['./rsvp-details.page.scss'],
})
export class RsvpDetailsPage implements OnInit {

  rsvp: Rsvp = {
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

  rsvpId = null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private rsvpService: RsvpService, 
    private loadingController: LoadingController,
    private router: Router) { }

  ngOnInit() {
    this.rsvpId = this.route.snapshot.params['id'];
    if (this.rsvpId)  {
      this.loadRsvp();
    }
  }

  async loadRsvp() {   
    const loading = await this.loadingController.create({
      message: 'Loading RSVPs..'
    });
    await loading.present();
 
    this.rsvpService.getRsvp(this.rsvpId).subscribe(res => {
      loading.dismiss();
      this.rsvp = res;
    });
  }

  async saveRsvp() {
 
    const loading = await this.loadingController.create({
      message: 'Saving RSVPs..'
    });
    await loading.present();
 
    if (this.rsvpId) {
      this.rsvpService.updateRsvp(this.rsvp, this.rsvpId).then(() => {
        loading.dismiss();
        this.router.navigate(['members', 'rsvpList']);
        //this.router.navigateByUrl('/members/rsvpList/');
        //this.nav.goBack(true);
      });
    } else {
      this.rsvpService.addRsvp(this.rsvp).then(() => {
        loading.dismiss();
        //this.nav.goBack(true);
        this.router.navigate(['members', 'rsvpList']);
        //this.router.navigateByUrl('/members/rsvpList/');
      });
    }
  }

  async goToGroupMembers() {
    if (this.rsvpId) {
      this.rsvpService.updateRsvp(this.rsvp, this.rsvpId).then(docRef => {
        this.router.navigateByUrl('/members/guestList/' + this.rsvpId);
      });
    } else {
      this.rsvpService.addRsvp(this.rsvp).then(docRef => {
        this.rsvpId = docRef.id;
        this.router.navigateByUrl('/members/guestList/' + this.rsvpId);
      });
    }
  }
}
