import { WeddingDayDetails, WeddingDayDetailsService } from 'src/app/services/wedding-day-details.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { WeddingParty, WeddingPartyService} from 'src/app/services/wedding-party.service';

@Component({
  selector: 'app-wedding-day-details',
  templateUrl: './wedding-day-details.page.html',
  styleUrls: ['./wedding-day-details.page.scss'],
})

export class WeddingDayDetailsPage implements OnInit {

  weddingDay: WeddingDayDetails = {
    WeddingPartyGroupdID: '',
    WeddingDate: null,
    EstimatedNoOfGuests: 0,
    YourName: '',
    YourNameID: '',
    BudgetEstimate: 0,
    FianceName: '',
    FianceNameID: '',
    ReceptionTime: null,
    DinnerTime: null,
    CocktailTime: null,
    WeddingInvitesSentOut: false,
    UpdatedAt: 0,
    CreatedAt: 0
  };

  weddingParty1: WeddingParty = {
    Name: '',
    WeddingSide: ''
  };

  weddingParty2: WeddingParty = {
    Name: '',
    WeddingSide: ''
  };

  weddingDayId = null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private weddingDayDetailsService: WeddingDayDetailsService, 
    private profileService: ProfileService, 
    private weddingPartyService: WeddingPartyService, 
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe(res => {
      if (res.WeddingID == null) {
        this.weddingDayId = this.route.snapshot.params['id'];
      } else {
        this.weddingDayId = res.WeddingID; 
      }
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
        this.updateWeddingPartyNames();
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

  updateWeddingPartyNames() {
    this.weddingParty1.Name = this.weddingDay.YourName;
    this.weddingPartyService.updateWeddingParty(this.weddingParty1, this.weddingDay.YourNameID);
    this.weddingParty2.Name = this.weddingDay.FianceName;
    this.weddingPartyService.updateWeddingParty(this.weddingParty2, this.weddingDay.FianceNameID);
  }
}
