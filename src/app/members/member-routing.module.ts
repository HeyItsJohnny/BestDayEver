import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'rsvpDetails/:id', loadChildren: './pages/rsvp-details/rsvp-details.module#RsvpDetailsPageModule' },
  { path: 'rsvpDetails', loadChildren: './pages/rsvp-details/rsvp-details.module#RsvpDetailsPageModule' },
  { path: 'rsvpList', loadChildren: './pages/rsvp-list/rsvp-list.module#RsvpListPageModule' },
  { path: 'weddingPartyList', loadChildren: './pages/wedding-party-list/wedding-party-list.module#WeddingPartyListPageModule' },
  { path: 'weddingDayDetails', loadChildren: './pages/wedding-day-details/wedding-day-details.module#WeddingDayDetailsPageModule' },
  { path: 'weddingPartyDetails', loadChildren: './pages/wedding-party-details/wedding-party-details.module#WeddingPartyDetailsPageModule' },
  { path: 'weddingPartyDetails/:id', loadChildren: './pages/wedding-party-details/wedding-party-details.module#WeddingPartyDetailsPageModule' },
  { path: 'dinnerDetails', loadChildren: './pages/dinner-details/dinner-details.module#DinnerDetailsPageModule' },
  { path: 'dinnerDetails/:id', loadChildren: './pages/dinner-details/dinner-details.module#DinnerDetailsPageModule' },
  { path: 'eventDetails', loadChildren: './pages/event-details/event-details.module#EventDetailsPageModule' },
  { path: 'eventDetails/:id', loadChildren: './pages/event-details/event-details.module#EventDetailsPageModule' },
  { path: 'eventList', loadChildren: './pages/event-list/event-list.module#EventListPageModule' },
  { path: 'dinnerList', loadChildren: './pages/dinner-list/dinner-list.module#DinnerListPageModule' },
  { path: 'vendorDetails', loadChildren: './pages/vendor-details/vendor-details.module#VendorDetailsPageModule' },
  { path: 'vendorDetails/:id', loadChildren: './pages/vendor-details/vendor-details.module#VendorDetailsPageModule' },
  { path: 'vendorList', loadChildren: './pages/vendor-list/vendor-list.module#VendorListPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule'}
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
