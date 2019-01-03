import { Component, OnInit } from '@angular/core';
import { Rsvp, RsvpService } from 'src/app/services/rsvp.service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-rsvp-list',
  templateUrl: './rsvp-list.page.html',
  styleUrls: ['./rsvp-list.page.scss'],
})

export class RsvpListPage implements OnInit {

  rsvps: Rsvp[];

  constructor(
    private rsvpService: RsvpService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.getRSVPData();
  }

  async getRSVPData() {
    /*const loading = await this.loadingController.create({
      message: 'Loading RSVP Groups..'
    });
    await loading.present();*/

    this.rsvpService.getRsvps().subscribe(res => {
      //loading.dismiss();
      this.rsvps = res;
    });
  }

  remove(item) {
    this.rsvpService.removeRsvp(item.id);
  }
}
