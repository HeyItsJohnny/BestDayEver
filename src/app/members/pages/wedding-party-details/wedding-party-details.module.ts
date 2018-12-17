import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WeddingPartyDetailsPage } from './wedding-party-details.page';

const routes: Routes = [
  {
    path: '',
    component: WeddingPartyDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WeddingPartyDetailsPage]
})
export class WeddingPartyDetailsPageModule {}
