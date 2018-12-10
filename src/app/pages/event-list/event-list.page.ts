import { Component, OnInit } from '@angular/core';
import { Event, EventsService} from 'src/app/services/events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {

  events: Event[];

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getEvents().subscribe(res => {
      this.events = res;
    });
  }
  remove(item) {
    this.eventsService.removeEvent(item.id);
  }
}
