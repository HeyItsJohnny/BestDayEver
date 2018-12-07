import { Component, OnInit } from '@angular/core';
import { Rsvp, RsvpService } from 'src/app/services/rsvp.service';

@Component({
  selector: 'app-rsvp-list',
  templateUrl: './rsvp-list.page.html',
  styleUrls: ['./rsvp-list.page.scss'],
})

export class RsvpListPage implements OnInit {

  rsvps: Rsvp[];

  constructor(private rsvpService: RsvpService) { }

  ngOnInit() {
    this.rsvpService.getRsvps().subscribe(res => {
      this.rsvps = res;
    });
  }
  remove(item) {
    this.rsvpService.removeRsvp(item.id);
  }
}
