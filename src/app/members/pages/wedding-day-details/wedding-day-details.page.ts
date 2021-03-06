import { WeddingDayDetails, WeddingDayDetailsService } from 'src/app/services/wedding-day-details.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, MenuController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';

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
    BudgetEstimate: 0,
    FianceName: '',
    ReceptionTime: null,
    DinnerTime: null,
    CocktailTime: null,
    WeddingInvitesSentOut: false,
    UpdatedAt: 0
  };

  weddingDayId = null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private weddingDayDetailsService: WeddingDayDetailsService, 
    private profileService: ProfileService, 
    public menuController: MenuController, 
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadWeddingDay();
  }

  ionViewWillEnter() {
    this.menuController.enable(true);
  }

  async loadWeddingDay() {   
    const loading = await this.loadingController.create({
      message: 'Loading Wedding Day..'
    });
    await loading.present();
    this.weddingDayDetailsService.getWeddingDay().subscribe(res => {
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
      this.weddingDayDetailsService.updateWeddingday(this.weddingDay).then(() => {
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
