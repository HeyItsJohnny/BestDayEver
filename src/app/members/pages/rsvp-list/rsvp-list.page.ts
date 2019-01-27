import { Component, OnInit } from '@angular/core';
import { Rsvp, RsvpService } from 'src/app/services/rsvp.service';
import { NavController, LoadingController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rsvp-list',
  templateUrl: './rsvp-list.page.html', 
  styleUrls: ['./rsvp-list.page.scss'],
})

export class RsvpListPage {

  rsvps: Rsvp[];
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;

  constructor(
    private rsvpService: RsvpService,
    private router: Router,
    private loadingController: LoadingController) { 
      this.searchControl = new FormControl();
    }

  ionViewWillEnter() {
    this.getRsvpData();
    this.searchControl.valueChanges.pipe(
      debounceTime(700)
    ).subscribe(search => {
      this.setFilteredRSVPGuests();
      /*if (search == "") {
        this.rsvps = this.rsvpService.getRsvps();
      } else {
        this.setFilteredRSVPGuests();
      }*/
    });
  }

  viewDetails(item){
    this.router.navigateByUrl('/members/rsvpDetails/' + item.payload.doc.id);
  }

  getRsvpData() {
    this.rsvpService.getRsvps()
    .then(data => {
      this.rsvps = data;
    })
  }

  //Filtering Items
  onSearchInput(){
    this.searching = true;
  }

  setFilteredRSVPGuests() {
    this.rsvps = this.filterRSVPGuests(this.searchTerm);
  }

  filterRSVPGuests(searchTerm) {
    return this.rsvps.filter((item) => {
      return item.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });  
  }
}
