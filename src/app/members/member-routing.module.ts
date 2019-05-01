import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'rsvpDetails/:id', loadChildren: './pages/rsvp-details/rsvp-details.module#RsvpDetailsPageModule' },
  { path: 'rsvpDetails', loadChildren: './pages/rsvp-details/rsvp-details.module#RsvpDetailsPageModule' },
  { path: 'rsvpList', loadChildren: './pages/rsvp-list/rsvp-list.module#RsvpListPageModule' },
  { path: 'dinnerList', loadChildren: './pages/dinner-list/dinner-list.module#DinnerListPageModule' },
  { path: 'weddingDayDetails', loadChildren: './pages/wedding-day-details/wedding-day-details.module#WeddingDayDetailsPageModule' },
  { path: 'dinnerDetails', loadChildren: './pages/dinner-details/dinner-details.module#DinnerDetailsPageModule' },
  { path: 'dinnerDetails/:id', loadChildren: './pages/dinner-details/dinner-details.module#DinnerDetailsPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
  { path: 'guestList', loadChildren: './pages/guest-list/guest-list.module#GuestListPageModule' },
  { path: 'guestList/:id', loadChildren: './pages/guest-list/guest-list.module#GuestListPageModule' },
  { path: 'guestDetails', loadChildren: './pages/guest-details/guest-details.module#GuestDetailsPageModule' },
  { path: 'guestDetails/:id', loadChildren: './pages/guest-details/guest-details.module#GuestDetailsPageModule' },
  { path: 'guestRsvpExample', loadChildren: './pages/guest-rsvp-example/guest-rsvp-example.module#GuestRsvpExamplePageModule' },  
  { path: 'budgetList', loadChildren: './pages/budget-list/budget-list.module#BudgetListPageModule' },
  { path: 'budgetDetails', loadChildren: './pages/budget-details/budget-details.module#BudgetDetailsPageModule' },
  { path: 'budgetDetails/:id', loadChildren: './pages/budget-details/budget-details.module#BudgetDetailsPageModule' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
