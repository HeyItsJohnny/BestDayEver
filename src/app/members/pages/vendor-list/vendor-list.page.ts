import { Component, OnInit } from '@angular/core';
import { Vendor, VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.page.html',
  styleUrls: ['./vendor-list.page.scss'],
})
export class VendorListPage implements OnInit {

  vendors: Vendor[];

  constructor(private vendorService: VendorService) { }

  ngOnInit() {
    this.vendorService.getVendors().subscribe(res => {
      this.vendors = res;
    });
  }
  remove(item) {
    this.vendorService.removeVendor(item.id);
  }
}