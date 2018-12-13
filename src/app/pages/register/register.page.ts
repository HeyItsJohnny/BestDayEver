import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
      console.log(result);
      if (result) {
        this.router.navigateByUrl('/home');
      } 
    }
    catch(e) {
      console.error(e);
    }
   }

}
