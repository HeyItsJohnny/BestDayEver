import { Component, OnInit } from '@angular/core';
import { WeddingPartyPerson, WeddingPartyPersonService } from 'src/app/services/wedding-party-person.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-wedding-party-person-details',
  templateUrl: './wedding-party-person-details.page.html',
  styleUrls: ['./wedding-party-person-details.page.scss'],
})
export class WeddingPartyPersonDetailsPage implements OnInit {

  weddingPartyPerson: WeddingPartyPerson = {
    Name: '',
    Email: '',
    PhoneNo: '',
    DinnerChoice: ''
  };

  weddingPartyPersonID = null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private weddingPartyPersonService: WeddingPartyPersonService, 
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.weddingPartyPersonID = this.route.snapshot.params['id'];
    if (this.weddingPartyPersonID)  {
      this.loadWeddingPartyPerson();
    }
  }

  async loadWeddingPartyPerson() {   
    const loading = await this.loadingController.create({
      message: 'Loading Wedding Party..'
    });
    await loading.present();
 
    this.weddingPartyPersonService.getWeddingPartyPerson(this.weddingPartyPersonID).subscribe(res => {
      loading.dismiss();
      this.weddingPartyPerson = res;
    });
  }

  async saveWeddingPartyPerson() {
    const loading = await this.loadingController.create({
      message: 'Saving Wedding Party..'
    });
    await loading.present();
 
    if (this.weddingPartyPersonID) {
      this.weddingPartyPersonService.updateWeddingPartyPerson(this.weddingPartyPerson, this.weddingPartyPersonID).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    } else {
      this.weddingPartyPersonService.addWeddingPartyPerson(this.weddingPartyPerson).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    }
  }
}
