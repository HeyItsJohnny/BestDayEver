import { Component, OnInit, EventEmitter } from '@angular/core';
import { RsvpGuest, RsvpGuestService } from 'src/app/services/rsvp-guest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'ionic-angular';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.page.html',
  styleUrls: ['./guest-list.page.scss'],
})
export class GuestListPage {

  rsvpGuests: RsvpGuest[];
  rsvpId = null;

  constructor(
    private rsvpGuestService: RsvpGuestService,
    private route: ActivatedRoute,
    private router: Router,
    public events: Events) { }

  /*ngOnInit() {
    this.rsvpId = this.route.snapshot.params['id'];
    if (this.rsvpId)  {   
      this.events.publish('guest:created', this.rsvpId);   
      this.rsvpGuestService.getRsvpGuests().subscribe(res => {
        this.rsvpGuests = res;
      });
    }
  }*/

  ionViewWillEnter() {
    this.getEventData();
  }

  getEventData() {
    this.rsvpId = this.route.snapshot.params['id'];
    if (this.rsvpId)  {   
      this.events.publish('guest:created', this.rsvpId);  
      this.rsvpGuestService.getRsvpGuests()
      .then(data => {
        this.rsvpGuests = data;
      }) 
    }
  }

  viewDetails(item){
    this.router.navigateByUrl('/members/guestDetails/' + item.payload.doc.id);
  }
}
