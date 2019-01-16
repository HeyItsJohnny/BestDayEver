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
    this.displayAddPrompt();
  }

  updateItem(item: Dinner) {
    this.displayUpdatePrompt(item.id, item);
  }

  displayUpdatePrompt(dinnerID: string, dinnerObj: Dinner) {
    this.alertController.create({
      header: 'Update Dinner',
      inputs: [
        {
          name: 'DinnerName',
          type: 'text',
          value: dinnerObj.Name,
          placeholder: 'Dinner'
        },
        {
          name: 'DinnerDescription',
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
            dinnerObj.Name = data.DinnerName;
            dinnerObj.Description = data.DinnerDescription;            
            this.dinnerService.updateDinner(dinnerObj, dinnerID);            
          }
        }
      ]
    }).then(alert => alert.present());
  }

  displayAddPrompt() {
    this.alertController.create({
      header: 'New Dinner',
      inputs: [
        {
          name: 'DinnerName',
          type: 'text',
          placeholder: 'Dinner'
        },
        {
          name: 'DinnerDescription',
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
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            var dinnerObj: Dinner = {
              Name: data.DinnerName,
              Description: data.DinnerDescription,
              DisplayOrder: 0,
              UpdatedAt: 0,
              CreatedAt: 0
            };       
            this.dinnerService.addDinner(dinnerObj);         
          }
        }
      ]
    }).then(alert => alert.present());
  }
}
