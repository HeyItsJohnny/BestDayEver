import { Component } from '@angular/core';


import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from '../app/services/authentication.service';
import { Router } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  public loginPages = [
    {
      title: 'Login',
      url: '/Login',
      icon: 'home'
    }
  ];

  public appPages = [
    {
      title: 'Home',
      url: '/members/home',
      canActivate: [AuthGuardService],
      icon: 'home'
    },
    {
      title: 'Wedding Details',
      url: '/members/weddingDayDetails',
      canActivate: [AuthGuardService],
      icon: 'md-checkmark-circle'
    },
    {
      title: 'Wedding Party',
      url: '/members/weddingPartyList',
      canActivate: [AuthGuardService],
      icon: 'md-checkmark-circle'
    },
    {
      title: 'RSVP Groups',
      url: '/members/rsvpList',
      canActivate: [AuthGuardService],
      icon: 'md-checkmark-circle'
    },
    {
      title: 'Events',
      url: '/members/eventList',
      canActivate: [AuthGuardService],
      icon: 'md-checkmark-circle'
    },
    {
      title: 'Dinner Setup',
      url: '/members/dinnerList',
      canActivate: [AuthGuardService],
      icon: 'md-checkmark-circle'
    },
    {
      title: 'Vendors',
      url: '/members/vendorList',
      canActivate: [AuthGuardService],
      icon: 'md-checkmark-circle'
    },
    {
      title: 'Start RSVP',
      url: '/members/guestRsvpExample',
      canActivate: [AuthGuardService],
      icon: 'md-add-circle'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['members', 'home']);
        } else {
          this.router.navigate(['Login']);
        }
      });

    });
  }

  Logout() {
    this.authService.logout();
  }

}
