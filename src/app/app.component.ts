import { Component } from '@angular/core';


import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from '../app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  //rootPage:any = 'Login';
  
  public appPages = [
    {
      title: 'Home',
      url: '/members/home',
      icon: 'home'
    },
    {
      title: 'Login',
      url: '/Login',
      icon: 'list'
    },
    {
      title: 'Wedding Details',
      url: '/members/weddingDayDetails',
      icon: 'list'
    },
    {
      title: 'Guests',
      url: '/members/rsvpList',
      icon: 'list'
    },
    {
      title: 'Wedding Party',
      url: '/members/weddingPartyList',
      icon: 'list'
    },
    {
      title: 'Events',
      url: '/members/eventList',
      icon: 'list'
    },
    {
      title: 'Dinners',
      url: '/members/dinnerList',
      icon: 'list'
    },
    {
      title: 'Vendors',
      url: '/members/VendorList',
      icon: 'list'
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
