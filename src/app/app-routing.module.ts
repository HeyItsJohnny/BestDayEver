import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'rsvpDetails/:id', loadChildren: './pages/rsvp-details/rsvp-details.module#RsvpDetailsPageModule' },
  { path: 'rsvpDetails', loadChildren: './pages/rsvp-details/rsvp-details.module#RsvpDetailsPageModule' },
  { path: 'rsvpList', loadChildren: './pages/rsvp-list/rsvp-list.module#RsvpListPageModule' },
  { path: 'weddingPartyDetails', loadChildren: './pages/wedding-party-details/wedding-party-details.module#WeddingPartyDetailsPageModule' },
  { path: 'weddingPartyDetails/:id', loadChildren: './pages/weddingParty-details/weddingParty-details.module#WeddingPartyDetailsPageModule' },
  { path: 'weddingPartyList', loadChildren: './pages/wedding-party-list/wedding-party-list.module#WeddingPartyListPageModule' },
  { path: 'weddingDayDetails', loadChildren: './pages/wedding-day-details/wedding-day-details.module#WeddingDayDetailsPageModule' }


  //{ path: 'rsvpDetails', loadChildren: './pages/rsvp-details/rsvp-details.module#RsvpDetailsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
