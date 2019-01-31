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

  rsvps: Array<any>;
  name_filtered_items: Array<any>;
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;
  searchValue: string;

  constructor(
    private rsvpService: RsvpService,
    private router: Router,
    private loadingController: LoadingController) { 
      this.searchControl = new FormControl();
    }

  ionViewWillEnter() {
    this.searchValue = "";
    this.getRsvpData();
  }

  viewDetails(item){
    this.router.navigateByUrl('/members/rsvpDetails/' + item.payload.doc.id);
  }

  getRsvpData() {
    this.rsvpService.getRsvps()
    .then(data => {
      this.rsvps = data;
      this.name_filtered_items = data;
    })
  }

  onInputChange(event){
    console.log("1. VALUE: " + this.searchValue);
    let value = this.searchValue.toLowerCase();
    console.log("2. VALUE: " + value);
    this.rsvpService.searchRSVPName(value)
    .then(res => {
      console.log("Results: " + res);
      this.name_filtered_items = res;
      this.rsvps = this.name_filtered_items;
    })
  }

 
}
