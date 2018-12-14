import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

import { AngularFireAuth } from "angularfire2/auth";
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private alertController: AlertController) { }

  async logout() {
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
