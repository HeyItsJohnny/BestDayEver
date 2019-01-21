import { Component, OnInit } from '@angular/core';
import { Vendor, VendorService } from 'src/app/services/vendor.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.page.html',
  styleUrls: ['./vendor-list.page.scss'],
})
export class VendorListPage implements OnInit {

  vendors: Vendor[];

  constructor(
    private vendorService: VendorService,
    public alertController: AlertController) { }

  ngOnInit() {
    this.vendorService.getVendors().subscribe(res => {
      this.vendors = res;
    });
  }
  remove(item) {
    this.vendorService.removeVendor(item.id);
  }

  async selectVendorCategory() {
    const alert = await this.alertController.create({
      header: 'Category',
      message: 'Please select a vendor category',
      inputs: [
        {
          name: 'Venue',
          type: 'radio',
          label: 'Venue',
          value: 'Venue'
        },
        {
          name: 'Photographer',
          type: 'radio',
          label: 'Photographer',
          value: 'Photographer'
        },
        {
          name: 'Videographer',
          type: 'radio',
          label: 'Videographer',
          value: 'Videographer'
        },
        {
          name: 'Wedding Planner',
          type: 'radio',
          label: 'Wedding Planner',
          value: 'Wedding Planner'
        },
        {
          name: 'Hotel Accommodations',
          type: 'radio',
          label: 'Hotel Accommodations',
          value: 'Hotel'
        },
        {
          name: 'Flight',
          type: 'radio',
          label: 'Flight',
          value: 'Flight'
        },
        {
          name: 'Other',
          type: 'radio',
          label: 'Other',
          value: 'Other'
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
            if (data == 'Flight') {

            } else if (data == 'Hotel Accomidations') {

            } else {
              
            }
          }
        }
      ]
    });
    await alert.present();
  }

}