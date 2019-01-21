import { Component, OnInit } from '@angular/core';
import { WeddingDayDetails, WeddingDayDetailsService } from 'src/app/services/wedding-day-details.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Profile, ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-venue-setup',
  templateUrl: './venue-setup.page.html',
  styleUrls: ['./venue-setup.page.scss'],
})
export class VenueSetupPage implements OnInit {

  weddingDay: WeddingDayDetails = {
    WeddingPartyGroupdID: '',
    WeddingDate: null,
    EstimatedNoOfGuests: 0,
    YourName: '',
    FianceName: '',
    ReceptionTime: null,
    DinnerTime: null,
    CocktailTime: null,
    VenueName: '',
    VenueAddress1: '',
    VenueAddress2: '',
    VenueCity: '',
    VenueState: '',
    VenueZipCode: '',
    WeddingInvitesSentOut: false,
    UpdatedAt: 0,
    CreatedAt: 0
  };
  weddingDayId = null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private weddingDayDetailsService: WeddingDayDetailsService, 
    private profileService: ProfileService, 
    private db: AngularFirestore,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe(res => {
      if (res.WeddingID == null) {
        this.weddingDayId = this.route.snapshot.params['id'];
      } else {
        this.weddingDayId = res.WeddingID; 
      }
      if (this.weddingDayId)  {
        this.loadVenueSetup();
      }
    });
  }

  async loadVenueSetup() {   
    const loading = await this.loadingController.create({
      message: 'Loading Wedding Day..'
    });
    await loading.present();
    this.weddingDayDetailsService.getWeddingDay(this.weddingDayId).subscribe(res => {
      loading.dismiss();
      this.weddingDay = res;
    });
  }

  async saveVenueSetup() {
    const loading = await this.loadingController.create({
      message: 'Saving Wedding Day Information..'
    });
    await loading.present();
    if (this.weddingDayId) {
      this.weddingDayDetailsService.updateWeddingday(this.weddingDay, this.weddingDayId).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    } else {
      this.weddingDayDetailsService.addWeddingDay(this.weddingDay).then(docRef => {
        this.profileService.addWeddingID(docRef.id);        
      });
      loading.dismiss();
      this.nav.goBack(true);
    }
  }

}
