import { Dinner, DinnerService } from 'src/app/services/dinner.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-dinner-details',
  templateUrl: './dinner-details.page.html',
  styleUrls: ['./dinner-details.page.scss'],
})
export class DinnerDetailsPage implements OnInit {

  dinner: Dinner = {
    Name: '',
    Description: '',
    DinnerType: '',
    DisplayOrder: 0,
    DinnerTime: null,
    DinnerDate: null,
    UpdatedAt: 0,
    CreatedAt: 0
  };

  dinnerId = null;

  constructor(private route: ActivatedRoute, private nav: NavController, private dinnerService: DinnerService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.dinnerId = this.route.snapshot.params['id'];
    if (this.dinnerId)  {
      this.loadDinner();
    }
  }

  async loadDinner() {   
    const loading = await this.loadingController.create({
      message: 'Loading Dinner..'
    });
    await loading.present();
 
    this.dinnerService.getDinner(this.dinnerId).subscribe(res => {
      loading.dismiss();
      this.dinner = res;
    });
  }

  async saveDinner() {
 
    const loading = await this.loadingController.create({
      message: 'Saving Dinner..'
    });
    await loading.present();
 
    if (this.dinnerId) {
      this.dinnerService.updateDinner(this.dinner, this.dinnerId).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    } else {
      this.dinnerService.addDinner(this.dinner).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    }
  }

}
