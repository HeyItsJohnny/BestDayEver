import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VendorHotelDetailsPage } from './vendor-hotel-details.page';

const routes: Routes = [
  {
    path: '',
    component: VendorHotelDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VendorHotelDetailsPage]
})
export class VendorHotelDetailsPageModule {}
