import { Vendor, VendorService } from 'src/app/services/vendor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.page.html',
  styleUrls: ['./vendor-details.page.scss'],
})
export class VendorDetailsPage implements OnInit {

  vendor: Vendor = {
    Name: '',
    SearchName: '',
    ContactCategory: '',
    Category: '',
    Email: '',
    PhoneNo: '',
    Address1: '',
    Address2: '',
    AddressCity: '',
    AddressState: '',
    AddressPostCode: '',
    Notes: '',
    Website: '',
    DateOfArrival: null,
    TimeOfArrival: null,
    Deposit: 0,
    LiabilityInsurance: '',
    MethodOfPayment: '',
    IsBooked: false,
    FlightDepartingAirline: '',
    FlightNumber: '',
    HotelWebsite: '',
    HotelRate: '',
    HotelConfirmationNumber: '',
    HotelPhoneNo: '',
    DateOfDeparture: null,
    TimeOfDeparture: null,
    UpdatedAt: 0,
    CreatedAt: 0
  };


  vendorId = null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private vendorService: VendorService, 
    private profileService: ProfileService, 
    public alertController: AlertController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.vendorId = this.route.snapshot.params['id'];
    if (this.vendorId)  {
      this.loadVendor();
    }
  }


  async loadVendor() {   
    const loading = await this.loadingController.create({
      message: 'Loading Vendors Contact..'
    });
    await loading.present();
 
    this.vendorService.getVendor(this.vendorId).subscribe(res => {
      loading.dismiss();
      this.vendor = res;
    });
  }

  async saveVendor() {
    const loading = await this.loadingController.create({
      message: 'Saving Vendor Contact..'
    });
    await loading.present();
 
    if (this.vendorId) {
      this.vendorService.updateVendor(this.vendor, this.vendorId).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    } else {
      this.vendorService.addVendor(this.vendor).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    }
  }

  async deleteVendor() {
    this.alertController.create({
      header: "Are you sure you want to delete this vendor?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.vendorService.removeVendor(this.vendorId).then(() => {
              this.nav.goBack(true);
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
