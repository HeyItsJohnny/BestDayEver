import { Component, OnInit } from '@angular/core';
import { Rsvp, RsvpService } from 'src/app/services/rsvp.service';
import { NavController, LoadingController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators/debounceTime';

@Component({
  selector: 'app-rsvp-list',
  templateUrl: './rsvp-list.page.html', 
  styleUrls: ['./rsvp-list.page.scss'],
})

export class RsvpListPage implements OnInit {

  rsvps: Rsvp[];
  searchTerm: string = '';
  searchControl: FormControl;

  constructor(
    private rsvpService: RsvpService,
    private loadingController: LoadingController) { 
      this.searchControl = new FormControl();
    }

  ngOnInit() {
    this.getRSVPData();
    this.searchControl.valueChanges.pipe(
      debounceTime(700)
    ).subscribe(search => {
      this.setFilteredRSVPGuests();
    });
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

  //Filtering Items
  setFilteredRSVPGuests() {
    this.rsvps = this.filterRSVPGuests(this.searchTerm);
  }

  filterRSVPGuests(searchTerm) {
    return this.rsvps.filter((item) => {
      return item.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });  
  }

  remove(item) {
    this.rsvpService.removeRsvp(item.id);
  }
}
