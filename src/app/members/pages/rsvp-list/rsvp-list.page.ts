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

  public rsvps: Array<any>;
  public loadedRsvps: Array<any>;
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
  }

  viewDetails(item){
    this.router.navigateByUrl('/members/rsvpDetails/' + item.payload.doc.id);
  }

  getRsvpData() {
    this.rsvpService.getRsvps()
    .then(data => {
      this.rsvps = data;
      this.loadedRsvps = data;
    })
  }

  initializeRsvps() {
    this.rsvps = this.loadedRsvps;
  }

  getItems(searchbar) {
    if (searchbar.srcElement.value == "") {
      this.getRsvpData();
    } else {
      var value = searchbar.srcElement.value;
      var valueTmp: string;
      valueTmp = value.toLowerCase();   
  
      this.rsvpService.searchRSVPName(valueTmp)
      .then(res => {
        this.rsvps = res;
      })
    }
  }
}
