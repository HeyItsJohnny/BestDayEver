import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { AlertController } from '@ionic/angular';
import { WeddingDayDetails, WeddingDayDetailsService } from 'src/app/services/wedding-day-details.service';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as User;

  weddingDay: WeddingDayDetails = {
    WeddingPartyGroupdID: '',
    WeddingDate: null,
    EstimatedNoOfGuests: 0,
    YourName: '',
    YourNameID: '',
    BudgetEstimate: 0,
    FianceName: '',
    FianceNameID: '',
    ReceptionTime: null,
    DinnerTime: null,
    CocktailTime: null,
    WeddingInvitesSentOut: false,
    UpdatedAt: 0,
    CreatedAt: 0
  };

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private alertController: AlertController,
    private authService: AuthenticationService) { }

  ngOnInit() {
  }

  register(user: User, weddingDay: WeddingDayDetails) {
    this.authService.register(user, weddingDay);
  }
}
