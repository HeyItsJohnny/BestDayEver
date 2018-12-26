import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/models/user';

import { AngularFireAuth } from "angularfire2/auth";
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
//import{ AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  user = {} as User;

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    //private afDatabase: AngularFireDatabase,   //Create Profile
    private db: AngularFirestore,
    private alertController: AlertController,
    private plt: Platform) { 
      this.plt.ready().then(() => {
        this.checkToken();
      });
    }

  checkToken() {
    var user = this.afAuth.auth.currentUser;
    if (user != null) {
      console.log('THERE IS A USER!');
      this.authenticationState.next(true);
    }
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

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

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      console.log(result);
      if (result) {
        this.authenticationState.next(true);
        console.log('GO TO HOME..');        
        this.router.navigateByUrl('/members/home');
      }  
    }
    catch(e) {
      console.error(e);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Incorrect username or password.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);      
      console.log(result);
      if (result) {
        this.createProfile(user,result.user.uid);   //Create Profile
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Thanks for signing up! Please sign in to continue.',
          buttons: ['OK']
        });
        //this.router.navigateByUrl('/Login');  //Create Profile
        await alert.present();
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

  createProfile(user: User, userid: string)  {
    //Create Profile
    console.log('Email: ' + user.email);
    console.log('First Name: ' + user.firstname);
    console.log('Last Name: ' + user.lastname);
    console.log('Wedding ID: ' + user.WeddingID);
    this.db.doc('profile/' + userid).set(this.user).then(() => this.router.navigateByUrl('/Login'));
    /*this.afAuth.authState.subscribe(auth => {
      this.db.doc('profile/${user.uid}').set(this.user)
      .then(() => this.router.navigateByUrl('/Login'));
    })*/
  }
}
