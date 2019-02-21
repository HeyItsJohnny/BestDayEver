import { Component, OnInit } from '@angular/core';
import { WeddingParty, WeddingPartyService} from 'src/app/services/wedding-party.service'
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-wedding-party-list',
  templateUrl: './wedding-party-list.page.html',
  styleUrls: ['./wedding-party-list.page.scss'],
})
export class WeddingPartyListPage implements OnInit {

  weddingPartys: WeddingParty[];

  constructor(
    private weddingPartyService: WeddingPartyService,
    public menuController: MenuController,
    public alertController: AlertController) { }

  ionViewWillEnter() {
    this.menuController.enable(true);
  }

  ngOnInit() {
    this.weddingPartyService.getWeddingPartys().subscribe (res => {
      this.weddingPartys = res;
    });
  }

  remove(item) {
    this.weddingPartyService.removeWeddingParty(item.id);
  }

  addWeddingParty() {
    this.displayAddPrompt();
  }

  displayAddPrompt() {
    this.alertController.create({
      header: "Add your or your Fiance's Name",
      inputs: [
        {
          name: 'Name',
          type: 'text',
          placeholder: 'Name'
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
            var weddingPartytObj: WeddingParty = {
              Name: data.Name,
              WeddingSide: ''
            };       
            this.weddingPartyService.addWeddingParty(weddingPartytObj);
          }
        }
      ]
    }).then(alert => alert.present());
  }

}
