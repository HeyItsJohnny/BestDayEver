import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GuestRsvpExamplePage } from './guest-rsvp-example.page';

const routes: Routes = [
  {
    path: '',
    component: GuestRsvpExamplePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GuestRsvpExamplePage]
})
export class GuestRsvpExamplePageModule {}
