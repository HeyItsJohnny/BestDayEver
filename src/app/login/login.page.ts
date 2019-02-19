import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;

  constructor(
    private router: Router, 
    private authService: AuthenticationService) { }

  ngOnInit() {
  }

  login(user: User) {
    this.authService.login(user);
  }

  doFacebookLogin() {
    console.log("FACEBOOK LOGIN.");
  }

  doGoogleLogin() {
    console.log("GOOGLE LOGIN.");
  }

  register() {
    this.router.navigateByUrl('/Register');
  }

}
