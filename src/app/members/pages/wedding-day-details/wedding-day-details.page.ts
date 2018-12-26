import { WeddingDayDetails, WeddingDayDetailsService } from 'src/app/services/wedding-day-details.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Profile, ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-wedding-day-details',
  templateUrl: './wedding-day-details.page.html',
  styleUrls: ['./wedding-day-details.page.scss'],
})

export class WeddingDayDetailsPage implements OnInit {

  weddingDay: WeddingDayDetails = {
    WeddingPartyGroupdID: '12345',
    WeddingDate: null,
    EstimatedNoOfGuests: 0,
    GroomName: '',
    BrideName: '',
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
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private loadingController: LoadingController) { }

  ngOnInit() {
    //this.weddingDayId = this.route.snapshot.params['id'];

    //Get Current User
    var authUser = this.afAuth.auth.currentUser;
    //Get Wedding Day from Current User
    console.log(authUser);
    console.log('USERID: ' + authUser.uid);
    this.profileService.getProfile(authUser.uid).subscribe(res => {
      //prof = res;
      console.log('RESULT!!!');
      console.log(res);
      this.weddingDayId = res.WeddingID;
      console.log('Wedding Date ID: ' + this.weddingDayId);
      if (this.weddingDayId)  {
        this.loadWeddingDay();
      }
    });    
  }

  async loadWeddingDay() {   
    const loading = await this.loadingController.create({
      message: 'Loading Wedding Day..'
    });
    await loading.present();
    this.weddingDayDetailsService.getWeddingDay(this.weddingDayId).subscribe(res => {
      loading.dismiss();
      this.weddingDay = res;
    });
  }

  async saveWeddingDay() {
 
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
      this.weddingDayDetailsService.addWeddingDay(this.weddingDay).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    }
  }
}
