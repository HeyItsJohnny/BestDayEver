import { Component, OnInit } from '@angular/core';
import { Dinner, DinnerService } from 'src/app/services/dinner.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dinner-list',
  templateUrl: './dinner-list.page.html',
  styleUrls: ['./dinner-list.page.scss'],
})
export class DinnerListPage implements OnInit {

  dinners: Dinner[];

  constructor(
    private dinnerService: DinnerService,
    public alertController: AlertController) { }

  ngOnInit() {
    this.dinnerService.getDinners().subscribe(res => {
      this.dinners = res;
    });
  }
  remove(item) {
    this.dinnerService.removeDinner(item.id);
  }

  addItem() {
    console.log("ADDING DINNER..");
  }

  updateItem(item: Dinner) {
    console.log("Updating Item: " + item.id);
  }

  displayPrompt(dinnerID: string, dinnerObj: Dinner) {
    this.alertController.create({
      header: 'Prompt!',
      inputs: [
        {
          name: 'Dinner',
          type: 'text',
          value: dinnerObj.Name,
          placeholder: 'Dinner'
        },
        {
          name: 'Description',
          type: 'text',
          value: dinnerObj.Description,
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
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if (dinnerID == "") {
              this.dinnerService.addDinner(dinnerObj);
            } else {
              this.dinnerService.updateDinner(dinnerObj, dinnerID);
            }
          }
        }
      ]
    }).then(alert => alert.present());
  }
}
