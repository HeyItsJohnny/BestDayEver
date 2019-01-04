import { WeddingParty, WeddingPartyService} from 'src/app/services/wedding-party.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wedding-party-details',
  templateUrl: './wedding-party-details.page.html',
  styleUrls: ['./wedding-party-details.page.scss'],
})
export class WeddingPartyDetailsPage implements OnInit {

  weddingParty: WeddingParty = {
    Name: '',
    WeddingSide: ''
  };

  weddingPartyId = null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private weddingPartyService: WeddingPartyService, 
    private loadingController: LoadingController,
    private router: Router) { }

  ngOnInit() {
    this.weddingPartyId = this.route.snapshot.params['id'];
    if (this.weddingPartyId)  {
      this.loadWeddingParty();
    }
  }

  async loadWeddingParty() {   
    const loading = await this.loadingController.create({
      message: 'Loading Wedding Party..'
    });
    await loading.present();
 
    this.weddingPartyService.getWeddingParty(this.weddingPartyId).subscribe(res => {
      loading.dismiss();
      this.weddingParty = res;
    });
  }

  async saveWeddingParty() {
 
    const loading = await this.loadingController.create({
      message: 'Saving Wedding Party..'
    });
    await loading.present();
 
    if (this.weddingPartyId) {
      this.weddingPartyService.updateWeddingParty(this.weddingParty, this.weddingPartyId).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    } else {
      this.weddingPartyService.addWeddingParty(this.weddingParty).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    }
  }

  async goToPartyMembers() {
    const loading = await this.loadingController.create({
      message: 'Saving RSVPs..'
    });
    await loading.present();

    if (this.weddingPartyId ) {
      this.weddingPartyService.updateWeddingParty(this.weddingParty, this.weddingPartyId).then(docRef => {
        loading.dismiss();
        this.router.navigateByUrl('/members/weddingPartyPersonList/' + this.weddingPartyId);
      });
    } else {
      this.weddingPartyService.addWeddingParty(this.weddingParty).then(docRef => {
        this.weddingPartyId = docRef.id;
        loading.dismiss();
        this.router.navigateByUrl('/members/weddingPartyPersonList/' + this.weddingPartyId);
      });
    }
  }

}
