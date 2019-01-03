import { Component, OnInit } from '@angular/core';
import { RsvpGuest, RsvpGuestService } from 'src/app/services/rsvp-guest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.page.html',
  styleUrls: ['./guest-list.page.scss'],
})
export class GuestListPage implements OnInit {

  rsvpGuests: RsvpGuest[];
  rsvpId = null;

  constructor(
    private rsvpGuestService: RsvpGuestService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.rsvpId = this.route.snapshot.params['id'];
    if (this.rsvpId)  {
      this.rsvpGuestService.getRsvpGuests(this.rsvpId).subscribe(res => {
        this.rsvpGuests = res;
      });
    }
  }
  remove(item) {
    this.rsvpGuestService.removeRsvpGuest(item.id);
  }
}
