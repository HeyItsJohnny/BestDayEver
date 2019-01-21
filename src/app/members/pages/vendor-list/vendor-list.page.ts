import { Component, OnInit } from '@angular/core';
import { Vendor, VendorService } from 'src/app/services/vendor.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.page.html',
  styleUrls: ['./vendor-list.page.scss'],
})
export class VendorListPage implements OnInit {

  vendors: Vendor[];

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

  constructor(
    private vendorService: VendorService,
    private router: Router,
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
          name: 'Wedding Planner',
          type: 'radio',
          label: 'Wedding Planner',
          value: 'Wedding Planner'
        },
        {
          name: 'Officiant',
          type: 'radio',
          label: 'Officiant',
          value: 'Officiant'
        },        
        {
          name: 'Venue',
          type: 'radio',
          label: 'Venue',
          value: 'Venue'
        },
        {
          name: 'Caterer',
          type: 'radio',
          label: 'Caterer',
          value: 'Caterer'
        },
        {
          name: 'Florists',
          type: 'radio',
          label: 'Florists',
          value: 'Florists'
        },
        {
          name: 'Rental Company',
          type: 'radio',
          label: 'Rental Company',
          value: 'Rental Company'
        },
        {
          name: 'Hairstylist',
          type: 'radio',
          label: 'Hairstylist',
          value: 'Hairstylist'
        },
        {
          name: 'Makeup Artist',
          type: 'radio',
          label: 'Makeup Artist',
          value: 'Makeup Artist'
        },
        {
          name: 'Dressmaker/Tailor',
          type: 'radio',
          label: 'Dressmaker/Tailor',
          value: 'Dressmaker/Tailor'
        },        
        {
          name: 'Invitations',
          type: 'radio',
          label: 'Invitations',
          value: 'Invitations'
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
          name: 'Cakemaker',
          type: 'radio',
          label: 'Cakemaker',
          value: 'Cakemaker'
        },
        {
          name: 'Liquor Supplier',
          type: 'radio',
          label: 'Liquor Supplier',
          value: 'Liquor Supplier'
        },
        {
          name: 'Transportation Company',
          type: 'radio',
          label: 'Transportation Company',
          value: 'Transportation Company'
        },
        {
          name: 'Personal Hotel',
          type: 'radio',
          label: 'Personal Hotel',
          value: 'Personal Hotel'
        },
        {
          name: 'Guest Hotel',
          type: 'radio',
          label: 'Guest Hotel',
          value: 'Guest Hotel'
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
            this.vendor.Category = data;
            this.vendorService.addVendor(this.vendor).then(docRef => {              
              if (data == 'Flight') {
                this.router.navigateByUrl('/members/vendorFlightDetails/' + docRef.id);
              } else if (data == 'Personal Hotel') {
                this.router.navigateByUrl('/members/vendorHotelDetails/' + docRef.id);
              } else if (data == 'Guest Hotel') {
                this.router.navigateByUrl('/members/vendorGuestHotelDetails/' + docRef.id);
              } else {
                this.router.navigateByUrl('/members/vendorDetails/' + docRef.id);
              }       
            });
            
          }
        }
      ]
    });
    await alert.present();
  }

  routeToVendorPage(item) {
    if (item.Category == 'Flight') {
      this.router.navigateByUrl('/members/vendorFlightDetails/' + item.id);
    } else if (item.Category == 'Personal Hotel') {
      this.router.navigateByUrl('/members/vendorHotelDetails/' + item.id);
    } else if (item.Category == 'Guest Hotel') {
      this.router.navigateByUrl('/members/vendorGuestHotelDetails/' + item.id);
    } else {
      this.router.navigateByUrl('/members/vendorDetails/' + item.id);
    }   
  }

}