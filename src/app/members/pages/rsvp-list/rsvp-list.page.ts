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
    // Reset items back to all of the items
    this.initializeRsvps();
  
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
    console.log('BEFORE');
    this.rsvps = this.rsvps.filter((v) => {
      console.log('1. INSIDE: ' + v.Name);
      if(v.payload.doc.Name && q) {
        console.log('2. INSIDE');
        if (v.payload.doc.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          console.log('3. INSIDE');
          return true;
        }
        console.log('4. INSIDE');
        return false;
      }
    });
  
    console.log(q, this.rsvps.length);
  
  }
 
}
