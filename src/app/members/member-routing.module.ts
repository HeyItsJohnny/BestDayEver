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
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
  { path: 'guestList', loadChildren: './pages/guest-list/guest-list.module#GuestListPageModule' },
  { path: 'guestList/:id', loadChildren: './pages/guest-list/guest-list.module#GuestListPageModule' },
  { path: 'guestDetails', loadChildren: './pages/guest-details/guest-details.module#GuestDetailsPageModule' },
  { path: 'guestDetails/:id', loadChildren: './pages/guest-details/guest-details.module#GuestDetailsPageModule' },
  { path: 'weddingPartyPersonList', loadChildren: './pages/wedding-party-person-list/wedding-party-person-list.module#WeddingPartyPersonListPageModule' },
  { path: 'weddingPartyPersonList/:id', loadChildren: './pages/wedding-party-person-list/wedding-party-person-list.module#WeddingPartyPersonListPageModule' },
  { path: 'weddingPartyPersonDetails', loadChildren: './pages/wedding-party-person-details/wedding-party-person-details.module#WeddingPartyPersonDetailsPageModule' },
  { path: 'weddingPartyPersonDetails/:id', loadChildren: './pages/wedding-party-person-details/wedding-party-person-details.module#WeddingPartyPersonDetailsPageModule' },
  { path: 'guestRsvpExample', loadChildren: './pages/guest-rsvp-example/guest-rsvp-example.module#GuestRsvpExamplePageModule' }
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
