import { Component, OnInit } from '@angular/core';
import { RsvpGuest, RsvpGuestService } from 'src/app/services/rsvp-guest.service';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.page.html',
  styleUrls: ['./guest-list.page.scss'],
})
export class GuestListPage implements OnInit {

  rsvpGuests: RsvpGuest[];

  constructor(private rsvpGuestService: RsvpGuestService ) { }

  ngOnInit() {
    this.rsvpGuestService.getRsvpGuests().subscribe(res => {
      this.rsvpGuests = res;
    });
  }
  remove(item) {
    this.rsvpGuestService.removeRsvpGuest(item.id);
  }
}
