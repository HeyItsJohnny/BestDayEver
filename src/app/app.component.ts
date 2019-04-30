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

  loginHidden: boolean;

  showLevel1WeddingDetails = null;    //Used for accordian list
  showLevel2WeddingDetails = null;    //Used for accordian list

  showLevel1PlanningTools = null;     //Used for accordian list
  showLevel2PlanningTools = null;     //Used for accordian list

  showLevel1WebsiteSetup = null;      //Used for accordian list
  showLevel2WebsiteSetup= null;       //Used for accordian list

  showLevel1VenueSetup = null;        //Used for accordian list
  showLevel2VenueSetup= null;         //Used for accordian list
  
  public loginPages = [
    {
      title: 'Login',
      url: '/Login',
      icon: 'home'
    }
  ];

  public homePages = [
    {
      title: 'Home',
      url: '/members/home',
      canActivate: [AuthGuardService],
      icon: 'home'
    },
    {
      title: 'Basic Information',
      url: '/members/weddingDayDetails',
      icon: 'md-checkmark-circle'
    },
    {
      title: 'Budget',
      url: '/members/budgetList',
      icon: 'md-checkmark-circle'
    },
    {
      title: 'Guest List',
      url: '/members/rsvpList',
      icon: 'md-checkmark-circle'
    },
    {
      title: 'Start RSVP',
      url: '/members/guestRsvpExample',
      canActivate: [AuthGuardService],
      icon: 'md-add-circle'
    }
  ]
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

      var authState = this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['members', 'home']);
          this.loginHidden = false;
        } else {
          this.router.navigate(['Login']);
          this.loginHidden = true;
        }
        authState.unsubscribe();
      });

    });
  }

  Logout() {
    this.authService.logout();
  }

  //Home
  GoToHomePage() {
    this.router.navigate(['members', 'home']);
  }
}
