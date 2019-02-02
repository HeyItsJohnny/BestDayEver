import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterQuickStartPage } from './register-quick-start.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterQuickStartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterQuickStartPage]
})
export class RegisterQuickStartPageModule {}
