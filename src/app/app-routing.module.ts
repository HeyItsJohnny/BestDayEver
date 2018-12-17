import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full'
  },
  { path: 'Register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'Login', loadChildren: './login/login.module#LoginPageModule' },
  { 
    path: 'members', 
    canActivate: [AuthGuardService],
    loadChildren: './members/member-routing.module#MemberRoutingModule'
  }/*
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
  { path: 'VendorDetails', loadChildren: './pages/vendor-details/vendor-details.module#VendorDetailsPageModule' },
  { path: 'VendorDetails/:id', loadChildren: './pages/vendor-details/vendor-details.module#VendorDetailsPageModule' },
  { path: 'VendorList', loadChildren: './pages/vendor-list/vendor-list.module#VendorListPageModule' },
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
