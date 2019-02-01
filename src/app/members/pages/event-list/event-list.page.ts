import { Component } from '@angular/core';
import { Event, EventsService} from 'src/app/services/events.service';
import { AlertController, SegmentButton } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})

export class EventListPage {
  events: Array<any>;
  segment: string;

  constructor(
    private eventsService: EventsService,
    public alertController: AlertController,
    private router: Router) { 
      this.segment = "today";
    }
 
  ionViewWillEnter() {
     this.getEventData();
  }

  getEventData() {
    this.eventsService.getEvents()
    .then(data => {
      this.events = data;
    })
  }

  getItems(searchbar) {
    if (searchbar.srcElement.value == "") {
      this.getEventData();
    } else {
      var value = searchbar.srcElement.value;
      var valueTmp: string;
      valueTmp = value.toLowerCase();   
  
      this.eventsService.searchEventName(valueTmp)
      .then(res => {
        this.events = res;
      })
    }
  }

  viewDetails(item){
    this.router.navigateByUrl('/members/eventDetails/' + item.payload.doc.id);
  }

  addEvent() {
    this.displayAddPrompt();
  }

  displayAddPrompt() {
    this.alertController.create({
      header: 'New Event',
      inputs: [
        {
          name: 'EventSubject',
          type: 'text',
          placeholder: 'Event'
        },
        {
          name: 'EventDescription',
          type: 'text',
          placeholder: 'Description'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.getEventData();
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            var eventObj: Event = {
              Subject: data.EventSubject,
              SearchName: '',
              Description: data.EventDescription,
              StartDate: null,
              EndDate: null,
              StartEventTime: null,
              EndEventTime: null,
              UpdatedAt: 0,
              CreatedAt: 0
            };       
            this.eventsService.addEvent(eventObj).then(docRef => {
              this.askAllDayEvent(docRef.id);
              this.getEventData();
            });    
          }
        }
      ]
    }).then(alert => alert.present());
  }

  askAllDayEvent(DocumentID: string) {
    this.alertController.create({
      header: "Start & End Date",
      message: 'Select "Yes" to set start/end date & times or "No" if it will be an all day event.',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.setStartDateTime(DocumentID);
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.getEventData();
            console.log('Confirm Cancel');            
          }
        }
      ]
    }).then(alert => alert.present());
  }

  setStartDateTime(DocumentID: string) {
    this.alertController.create({
      header: 'Start Date & Time',
      inputs: [
        {
          name: 'EventStartDate',
          type: 'date'
        },
        {
          name: 'EventStartTime',
          type: 'time'
        },
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
            this.eventsService.updateEventStartDateTime(data.EventStartDate, data.EventStartTime, DocumentID);
            this.setEndDateTime(DocumentID);            
          }
        }
      ]
    }).then(alert => alert.present());
  }

  setEndDateTime(DocumentID: string) {
    this.alertController.create({
      header: 'End Date & Time',
      inputs: [
        {
          name: 'EventEndDate',
          type: 'date'
        },
        {
          name: 'EventEndTime',
          type: 'time'
        },
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
            this.eventsService.updateEventEndDateTime(data.EventEndDate, data.EventEndTime, DocumentID);
            this.getEventData();
          }
        }
      ]
    }).then(alert => alert.present());
  }
}
