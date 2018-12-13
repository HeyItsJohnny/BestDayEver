import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  async login(user: User) {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      console.log(result);
      if (result) {
        this.router.navigateByUrl('/home');
      }  
    }
    catch(e) {
      console.error(e);
      const alert = await this.alertController.create({
        header: 'Error',
        message: e,
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  register() {
    this.router.navigateByUrl('/Register');
  }

}
