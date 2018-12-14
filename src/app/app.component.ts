import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { AlertController } from '@ionic/angular';

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
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async Logout() {
    await this.afAuth.auth.signOut();
    this.router.navigateByUrl('/Login');
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'You have successfully logged out!',
      buttons: ['OK']
    });
    await alert.present();
  }
  
}
