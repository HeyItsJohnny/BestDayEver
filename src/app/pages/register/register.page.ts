import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { AlertController } from '@ionic/angular';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as User;

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private alertController: AlertController,
    private authService: AuthenticationService) { }

  ngOnInit() {
  }

  register(user: User) {
    this.authService.register(user);
  }
}
