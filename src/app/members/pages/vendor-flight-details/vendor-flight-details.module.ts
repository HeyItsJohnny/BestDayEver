import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VendorFlightDetailsPage } from './vendor-flight-details.page';

const routes: Routes = [
  {
    path: '',
    component: VendorFlightDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VendorFlightDetailsPage]
})
export class VendorFlightDetailsPageModule {}
