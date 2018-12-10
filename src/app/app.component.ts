import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
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
      title: 'Dinner Details',
      url: '/dinnerList',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
