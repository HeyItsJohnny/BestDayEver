import { Event, EventsService} from 'src/app/services/events.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  event: Event = {
    Subject: '',
    Description: '',
    StartDate: null,
    EndDate: null,
    StartEventTime: null,
    EndEventTime: null,
    UpdatedAt: 0,
    CreatedAt: 0
  };

  eventId = null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private router: Router,
    private eventsService: EventsService, 
    public alertController: AlertController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    if (this.eventId)  {
      this.loadEvent();
    }
  }

  async loadEvent() {   
    const loading = await this.loadingController.create({
      message: 'Loading Event..'
    });
    await loading.present();
 
    this.eventsService.getEvent(this.eventId).subscribe(res => {
      loading.dismiss();
      this.event = res;
    });
  }

  async saveEvent() {
    const loading = await this.loadingController.create({
      message: 'Saving Event..'
    });
    await loading.present();
 
    if (this.eventId) {
      this.eventsService.updateEvent(this.event, this.eventId).then(() => {
        loading.dismiss();
        this.router.navigateByUrl('/members/eventList/');
      });
    } 
  }

  async deleteEvent() {
    this.alertController.create({
      header: "Are you sure you want to delete this event?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.eventsService.removeEvent(this.eventId).then(() => {
              this.router.navigateByUrl('/members/eventList/');
            });
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }
      ]
    }).then(alert => alert.present());
  }
}
