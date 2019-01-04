import { Component, OnInit } from '@angular/core';
import { WeddingPartyPerson, WeddingPartyPersonService } from 'src/app/services/wedding-party-person.service';
import { ActivatedRoute } from '@angular/router';
import { Events } from 'ionic-angular';

@Component({
  selector: 'app-wedding-party-person-list',
  templateUrl: './wedding-party-person-list.page.html',
  styleUrls: ['./wedding-party-person-list.page.scss'],
})
export class WeddingPartyPersonListPage implements OnInit {

  weddingPartyPersons: WeddingPartyPerson[];
  weddingPartyPersonId = null;

  constructor(
    private weddingPartyPersonService: WeddingPartyPersonService,
    private route: ActivatedRoute,
    public events: Events) { }

  ngOnInit() {
    this.weddingPartyPersonId = this.route.snapshot.params['id'];
    if (this.weddingPartyPersonId)  {   
      this.events.publish('weddingperson:created', this.weddingPartyPersonId);   
      this.weddingPartyPersonService.getWeddingPartyPersons().subscribe(res => {
        this.weddingPartyPersons = res;
      });
    }
  }
  remove(item) {
    this.weddingPartyPersonService.removeWeddingPartyPerson(item.id);
  }
}
