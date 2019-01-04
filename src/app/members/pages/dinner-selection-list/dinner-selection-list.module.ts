import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DinnerSelectionListPage } from './dinner-selection-list.page';

const routes: Routes = [
  {
    path: '',
    component: DinnerSelectionListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DinnerSelectionListPage]
})
export class DinnerSelectionListPageModule {}
