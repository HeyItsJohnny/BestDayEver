import { Component, OnInit } from '@angular/core';
import { Rsvp, RsvpService } from 'src/app/services/rsvp.service';
import { RsvpGuest, RsvpGuestService } from 'src/app/services/rsvp-guest.service';

@Component({
  selector: 'app-guest-rsvp-example',
  templateUrl: './guest-rsvp-example.page.html',
  styleUrls: ['./guest-rsvp-example.page.scss'],
})
export class GuestRsvpExamplePage implements OnInit {

  constructor() { }

  findRsvpGuest: RsvpGuest = {
    Name: '',
    Email: '',
    PhoneNo: '',
    DinnerChoice: '',
    DinnerChoiceText: ''
  };

  ngOnInit() {
  }

  findGuestRSVP() {
    console.log("RSVP GUEST NAME: " + this.findRsvpGuest.Name);
  }

}
