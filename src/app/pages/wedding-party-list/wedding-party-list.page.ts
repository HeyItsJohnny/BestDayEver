import { Component, OnInit } from '@angular/core';
import { WeddingParty, WeddingPartyService} from 'src/app/services/wedding-party.service'

@Component({
  selector: 'app-wedding-party-list',
  templateUrl: './wedding-party-list.page.html',
  styleUrls: ['./wedding-party-list.page.scss'],
})
export class WeddingPartyListPage implements OnInit {

  weddingPartys: WeddingParty[];

  constructor(private weddingPartyService: WeddingPartyService) { }

  ngOnInit() {
    this.weddingPartyService.getWeddingPartys().subscribe (res => {
      this.weddingPartys = res;
    });
  }

  remove(item) {
    this.weddingPartyService.removeWeddingParty(item.id);
  }

}
