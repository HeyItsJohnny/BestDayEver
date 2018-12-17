import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { AlertController } from '@ionic/angular';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private alertController: AlertController, 
    private authService: AuthenticationService) { }

  ngOnInit() {
  }

  login(user: User) {
    this.authService.login(user);
  }

  register() {
    this.router.navigateByUrl('/Register');
  }

}
