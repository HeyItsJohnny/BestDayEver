import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WeddingPartyPersonDetailsPage } from './wedding-party-person-details.page';

const routes: Routes = [
  {
    path: '',
    component: WeddingPartyPersonDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WeddingPartyPersonDetailsPage]
})
export class WeddingPartyPersonDetailsPageModule {}
