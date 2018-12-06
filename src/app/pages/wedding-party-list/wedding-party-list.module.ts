import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WeddingPartyListPage } from './wedding-party-list.page';

const routes: Routes = [
  {
    path: '',
    component: WeddingPartyListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WeddingPartyListPage]
})
export class WeddingPartyListPageModule {}
