import { Vendor, VendorService } from 'src/app/services/vendor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-vendor-guest-hotel-details',
  templateUrl: './vendor-guest-hotel-details.page.html',
  styleUrls: ['./vendor-guest-hotel-details.page.scss'],
})
export class VendorGuestHotelDetailsPage implements OnInit {

  vendor: Vendor = {
    Name: '',
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
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.vendorId = this.route.snapshot.params['id'];
    if (this.vendorId)  {
      this.loadVendor();
    }
  }

  async loadVendor() {   
    const loading = await this.loadingController.create({
      message: 'Loading Vendor Contact..'
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

}
