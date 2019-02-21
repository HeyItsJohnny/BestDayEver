import { Component, OnInit } from '@angular/core';
import { WeddingPartyPerson, WeddingPartyPersonService } from 'src/app/services/wedding-party-person.service';
import { ActivatedRoute } from '@angular/router';
import { Events } from 'ionic-angular';
import { AlertController, MenuController } from '@ionic/angular';

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
    public events: Events,
    public menuController: MenuController,
    public alertController: AlertController) { }

  ngOnInit() {
    this.weddingPartyPersonId = this.route.snapshot.params['id'];
    if (this.weddingPartyPersonId)  {   
      this.events.publish('weddingperson:created', this.weddingPartyPersonId);   
      this.weddingPartyPersonService.getWeddingPartyPersons().subscribe(res => {
        this.weddingPartyPersons = res;
      });
    }
  }

  ionViewWillEnter() {
    this.menuController.enable(true);
  }

  remove(item) {
    this.weddingPartyPersonService.removeWeddingPartyPerson(item.id);
  }

  updateWeddingPartyPerson(item: WeddingPartyPerson) {
    this.displayUpdatePrompt(item.id, item);
  }

  addWeddingPartyPerson() {
    this.displayAddPrompt();
  }

  displayAddPrompt() {
    this.alertController.create({
      header: 'New Wedding Party',
      inputs: [
        {
          name: 'PartyName',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: 'PartyPhoneNo',
          type: 'text',
          placeholder: 'Phone No.'
        },
        {
          name: 'PartyEmail',
          type: 'text',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            var weddignPartyPersonObj: WeddingPartyPerson = {
              Name: data.PartyName,
              Email: data.PartyEmail,
              PhoneNo: data.PartyPhoneNo
            };       
            this.weddingPartyPersonService.addWeddingPartyPerson(weddignPartyPersonObj);
          }
        }
      ]
    }).then(alert => alert.present());
  }

  displayUpdatePrompt(dinnerID: string, weddingPartyPersonObj: WeddingPartyPerson) {
    this.alertController.create({
      header: 'Update Wedding Party',
      inputs: [
        {
          name: 'PartyName',
          type: 'text',
          value: weddingPartyPersonObj.Name,
          placeholder: 'Name'
        },
        {
          name: 'PartyPhoneNo',
          type: 'text',
          value: weddingPartyPersonObj.PhoneNo,
          placeholder: 'Phone No.'
        },
        {
          name: 'PartyEmail',
          type: 'text',
          value: weddingPartyPersonObj.Email,
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            weddingPartyPersonObj.Name = data.PartyName;
            weddingPartyPersonObj.PhoneNo = data.PartyPhoneNo;     
            weddingPartyPersonObj.Email= data.PartyEmail;        
            this.weddingPartyPersonService.updateWeddingPartyPerson(weddingPartyPersonObj, dinnerID);            
          }
        }
      ]
    }).then(alert => alert.present());
  }
}
