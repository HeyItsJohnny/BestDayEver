import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from '../app/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage:any = 'Login';
  
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Login',
      url: '/Login',
      icon: 'list'
    },
    {
      title: 'Wedding Details',
      url: '/weddingDayDetails',
      icon: 'list'
    },
    {
      title: 'Guests',
      url: '/rsvpList',
      icon: 'list'
    },
    {
      title: 'Wedding Party',
      url: '/weddingPartyList',
      icon: 'list'
    },
    {
      title: 'Events',
      url: '/eventList',
      icon: 'list'
    },
    {
      title: 'Dinners',
      url: '/dinnerList',
      icon: 'list'
    },
    {
      title: 'Vendors',
      url: '/VendorList',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  Logout() {
    this.authService.logout();
  }

}
