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
  { path: 'guestRsvpExample', loadChildren: './pages/guest-rsvp-example/guest-rsvp-example.module#GuestRsvpExamplePageModule' },  
  { path: 'vendorFlightDetails', loadChildren: './pages/vendor-flight-details/vendor-flight-details.module#VendorFlightDetailsPageModule' },
  { path: 'vendorFlightDetails/:id', loadChildren: './pages/vendor-flight-details/vendor-flight-details.module#VendorFlightDetailsPageModule' },
  { path: 'vendorHotelDetails', loadChildren: './pages/vendor-hotel-details/vendor-hotel-details.module#VendorHotelDetailsPageModule' },
  { path: 'vendorHotelDetails/:id', loadChildren: './pages/vendor-hotel-details/vendor-hotel-details.module#VendorHotelDetailsPageModule' },
  { path: 'vendorGuestHotelDetails', loadChildren: './pages/vendor-guest-hotel-details/vendor-guest-hotel-details.module#VendorGuestHotelDetailsPageModule' },
  { path: 'vendorGuestHotelDetails/:id', loadChildren: './pages/vendor-guest-hotel-details/vendor-guest-hotel-details.module#VendorGuestHotelDetailsPageModule' },
  { path: 'dinnerDetails', loadChildren: './pages/dinner-details/dinner-details.module#DinnerDetailsPageModule' },
  { path: 'dinnerDetails/:id', loadChildren: './pages/dinner-details/dinner-details.module#DinnerDetailsPageModule' },
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
