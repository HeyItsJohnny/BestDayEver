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
    }
  ]

  public weddingDetailsPages = [
    {
      title: 'Basic Information',
      url: '/members/weddingDayDetails',
      canActivate: [AuthGuardService],
      icon: 'md-checkmark-circle'
    },
    {
      title: 'Day of Timeline',
      url: '',
      canActivate: [AuthGuardService],
      icon: 'md-checkmark-circle'
    },
    {
      title: 'Guest List',
      url: '/members/rsvpList',
      canActivate: [AuthGuardService],
      icon: 'md-checkmark-circle'
    },   
    {
      title: 'Wedding Party',
      url: '/members/weddingPartyList',
      canActivate: [AuthGuardService],
      icon: 'md-checkmark-circle'
    }
  ]

  public planningToolsPages = [
    {
      title: 'Budget',
      url: '',
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
      title: 'Registry',
      url: '',
      canActivate: [AuthGuardService],
      icon: 'md-checkmark-circle'
    },    
    {
      title: 'Tasks',
      url: '',
      canActivate: [AuthGuardService],
      icon: 'md-checkmark-circle'
    },
    {
      title: 'Vendors',
      url: '/members/vendorList',
      canActivate: [AuthGuardService],
      icon: 'md-checkmark-circle'
    },
  ]

  public websiteSetupPages = [
    {
      title: 'Basic Setup',
      url: '',
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
      title: 'Images',
      url: '',
      canActivate: [AuthGuardService],
      icon: 'md-checkmark-circle'
    },
    {
      title: 'Start RSVP',
      url: '/members/guestRsvpExample',
      canActivate: [AuthGuardService],
      icon: 'md-add-circle'
    }
  ]

  public venueSetupPages = [
    {
      title: 'Details',
      url: '/members/weddingDayDetails',
      canActivate: [AuthGuardService],
      icon: 'md-checkmark-circle'
    },
    {
      title: 'Sleeping Arrangements',
      url: '',
      canActivate: [AuthGuardService],
      icon: 'md-checkmark-circle'
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

  //Home
  GoToHomePage() {
    this.router.navigate(['members', 'home']);
  }

  //Wedding Details Accordian -
  toggleLevel1WeddingDetails(idx) {
    if (this.isLevel1ShownWeddingDetails(idx)) {
      this.showLevel1WeddingDetails = null;
    } else {
      this.showLevel1WeddingDetails = idx;
    }
  }
  
  toggleLevel2WeddingDetails(idx) {
    if (this.isLevel2ShownWeddingDetails(idx)) {
      this.showLevel1WeddingDetails = null;
      this.showLevel2WeddingDetails = null;
    } else {
      this.showLevel1WeddingDetails = idx;
      this.showLevel2WeddingDetails = idx;
    }
  }

  isLevel1ShownWeddingDetails(idx) {
    return this.showLevel1WeddingDetails === idx;
  }
  
  isLevel2ShownWeddingDetails(idx) {
    return this.showLevel2WeddingDetails === idx;
  }
  //Wedding Details Accordian +

  //Planning Tools Accordian -
  toggleLevel1PlanningTools(idx) {
    if (this.isLevel1ShownPlanningTools(idx)) {
      this.showLevel1PlanningTools = null;
    } else {
      this.showLevel1PlanningTools = idx;
    }
  }
  
  toggleLevel2PlanningTools(idx) {
    if (this.isLevel2ShownPlanningTools(idx)) {
      this.showLevel1PlanningTools = null;
      this.showLevel2PlanningTools = null;
    } else {
      this.showLevel1PlanningTools = idx;
      this.showLevel2PlanningTools = idx;
    }
  }

  isLevel1ShownPlanningTools(idx) {
    return this.showLevel1PlanningTools === idx;
  }
  
  isLevel2ShownPlanningTools(idx) {
    return this.showLevel2PlanningTools === idx;
  }
  //Planning Tools Accordian +

  //Website Setup Accordian -
  toggleLevel1WebsiteSetup(idx) {
    if (this.isLevel1ShownWebsiteSetup(idx)) {
      this.showLevel1WebsiteSetup = null;
    } else {
      this.showLevel1WebsiteSetup = idx;
    }
  }
  
  toggleLevel2WebsiteSetup(idx) {
    if (this.isLevel2ShownWebsiteSetup(idx)) {
      this.showLevel1WebsiteSetup = null;
      this.showLevel2WebsiteSetup = null;
    } else {
      this.showLevel1WebsiteSetup = idx;
      this.showLevel2WebsiteSetup = idx;
    }
  }

  isLevel1ShownWebsiteSetup(idx) {
    return this.showLevel1WebsiteSetup=== idx;
  }
  
  isLevel2ShownWebsiteSetup(idx) {
    return this.showLevel2WebsiteSetup=== idx;
  }
  //Website Setup Accordian +

  //Venue Setup Accordian -
  toggleLevel1VenueSetup(idx) {
    if (this.isLevel1ShownVenueSetup(idx)) {
      this.showLevel1VenueSetup = null;
    } else {
      this.showLevel1VenueSetup = idx;
    }
  }
  
  toggleLevel2VenueSetup(idx) {
    if (this.isLevel2ShownVenueSetup(idx)) {
      this.showLevel1VenueSetup = null;
      this.showLevel2VenueSetup = null;
    } else {
      this.showLevel1VenueSetup= idx;
      this.showLevel2VenueSetup = idx;
    }
  }

  isLevel1ShownVenueSetup(idx) {
    return this.showLevel1VenueSetup=== idx;
  }
  
  isLevel2ShownVenueSetup(idx) {
    return this.showLevel2VenueSetup=== idx;
  }
  //Venue Setup Accordian +
}
