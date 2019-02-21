import { Component, OnInit } from '@angular/core';
import { Vendor, VendorService } from 'src/app/services/vendor.service';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.page.html',
  styleUrls: ['./vendor-list.page.scss'],
})
export class VendorListPage {

  vendors: Vendor[];

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

  constructor(
    private vendorService: VendorService,
    private router: Router,
    public menuController: MenuController,
    public alertController: AlertController) { }

  ionViewWillEnter() {
    this.menuController.enable(true);
    this.getVendorData();
   }

   getVendorData() {
    this.vendorService.getVendors()
    .then(data => {
      this.vendors = data;
    })
  }

  getItems(searchbar) {
    if (searchbar.srcElement.value == "") {
      this.getVendorData();
    } else {
      var value = searchbar.srcElement.value;
      var valueTmp: string;
      valueTmp = value.toLowerCase();   
  
      this.vendorService.searchVendorName(valueTmp)
      .then(res => {
        this.vendors = res;
      })
    }
  }

  async selectVendorCategory() {
    const alert = await this.alertController.create({
      header: 'Category',
      message: 'Please select a vendor category',
      inputs: [
        {
          name: 'Cakemaker',
          type: 'radio',
          label: 'Cakemaker',
          value: 'Cakemaker'
        },
        {
          name: 'Caterer',
          type: 'radio',
          label: 'Caterer',
          value: 'Caterer'
        },
        {
          name: 'DJ/Music',
          type: 'radio',
          label: 'DJ/Music',
          value: 'DJ/Music'
        },
        {
          name: 'Dressmaker',
          type: 'radio',
          label: 'Dressmaker',
          value: 'Dressmaker'
        }, 
        {
          name: 'Flight',
          type: 'radio',
          label: 'Flight',
          value: 'Flight'
        }, 
        {
          name: 'Florists',
          type: 'radio',
          label: 'Florists',
          value: 'Florists'
        },
        {
          name: 'Hairstylist',
          type: 'radio',
          label: 'Hairstylist',
          value: 'Hairstylist'
        }, 
        {
          name: 'Hotel - Guest',
          type: 'radio',
          label: 'Hotel - Guest',
          value: 'Hotel - Guest'
        },
        {
          name: 'Hotel - Personal',
          type: 'radio',
          label: 'Hotel - Personal',
          value: 'Hotel - Personal'
        },
        {
          name: 'Invitations',
          type: 'radio',
          label: 'Invitations',
          value: 'Invitations'
        },
        {
          name: 'Liquor Supplier',
          type: 'radio',
          label: 'Liquor Supplier',
          value: 'Liquor Supplier'
        },
        {
          name: 'Makeup Artist',
          type: 'radio',
          label: 'Makeup Artist',
          value: 'Makeup Artist'
        },
        {
          name: 'Officiant',
          type: 'radio',
          label: 'Officiant',
          value: 'Officiant'
        },    
        {
          name: 'Photographer',
          type: 'radio',
          label: 'Photographer',
          value: 'Photographer'
        },
        {
          name: 'Rental Company',
          type: 'radio',
          label: 'Rental Company',
          value: 'Rental Company'
        },
        {
          name: 'Tailor',
          type: 'radio',
          label: 'Tailor',
          value: 'Tailor'
        },  
        {
          name: 'Transportation Company',
          type: 'radio',
          label: 'Transportation Company',
          value: 'Transportation Company'
        }, 
        {
          name: 'Venue',
          type: 'radio',
          label: 'Venue',
          value: 'Venue'
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
              } else if (data == 'Hotel - Personal') {
                this.router.navigateByUrl('/members/vendorHotelDetails/' + docRef.id);
              } else if (data == 'Hotel - Guest') {
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
    if (item.payload.doc.Category == 'Flight') {
      this.router.navigateByUrl('/members/vendorFlightDetails/' + item.payload.doc.id);
    } else if (item.payload.doc.Category == 'Hotel - Personal') {
      this.router.navigateByUrl('/members/vendorHotelDetails/' + item.payload.doc.id);
    } else if (item.payload.doc.Category == 'Hotel - Guest') {
      this.router.navigateByUrl('/members/vendorGuestHotelDetails/' + item.payload.doc.id);
    } else {
      this.router.navigateByUrl('/members/vendorDetails/' + item.payload.doc.id);
    }   
  }

}