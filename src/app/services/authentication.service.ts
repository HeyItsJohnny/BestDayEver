import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/models/user';

import { AngularFireAuth } from "angularfire2/auth";
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { WeddingDayDetails } from 'src/app/services/wedding-day-details.service';
import { Profile, ProfileService } from 'src/app/services/profile.service';
import { WeddingParty } from 'src/app/services/wedding-party.service'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  user = {} as User;

  weddingParty: WeddingParty = {
    Name: '',
    WeddingSide: ''
  };

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private db: AngularFirestore,
    private alertController: AlertController,
    private profileService: ProfileService, 
    private plt: Platform) { 
      this.plt.ready().then(() => {
        this.checkToken();
      });
    }

  checkToken() {
    var user = this.afAuth.auth.currentUser;
    if (user != null) {
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
      if (result) {
        this.authenticationState.next(true);
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

  /*async register(user: User, weddingDay: WeddingDayDetails) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);      
      if (result) {
        this.createProfile(user,result.user.uid,weddingDay);   //Create Profile
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Thanks for signing up! Please sign in to continue.',
          buttons: ['OK']
        });
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
  }*/

  createProfile(user: User, userid: string, weddingDay: WeddingDayDetails)  {
    //Create Profile
    weddingDay.YourName = user.name;
    this.db.doc('profile/' + userid).set(user).then(() => {
      //Create Wedding Day
      this.createWeddingDayWithID(weddingDay, userid).then(docRef1 => {
        //Set Wedding Day ID to Profile
        this.profileService.addWeddingIDWithID(docRef1.id, userid).then(docRef2 => {
          if (weddingDay.YourName) {
            //Create Wedding Parties
            this.createWeddingPartyPerson(weddingDay.YourName,userid).then(docRef3 => {
              this.updateYourWeddingPartyID(docRef3.id,userid,docRef1.id);
            });
          }
          if (weddingDay.FianceName) {
            //Create Wedding Parties
            this.createWeddingPartyPerson(weddingDay.FianceName,userid).then(docRef4 => {
              this.updateYourFianceWeddingPartyID(docRef4.id,userid,docRef1.id);
            });
          }
        });
      });    
      //Set Wedding Party ID's on the Wedding Day Doc.
      this.router.navigateByUrl('/Login');
    });
  }

  createWeddingDayWithID(weddingDay: WeddingDayDetails, UserID: string) {
    let weddingDetailsCollection = this.db.collection<Profile>('profile').doc(UserID).collection('weddingDayDetails');
    return weddingDetailsCollection.add(weddingDay);
  }

  createWeddingPartyPerson(WeddingPartyName: string, UserID: string) {
    this.weddingParty.Name = WeddingPartyName;
    let weddingPartyCollection = this.db.collection<Profile>('profile').doc(UserID).collection('weddingparty');
    return weddingPartyCollection.add(this.weddingParty);
  }

  updateYourWeddingPartyID(weddingpartyid: string, UserID: string, weddingDetailsID: string) {
    let weddingPartyUpdateCollection = this.db.collection<Profile>('profile').doc(UserID).collection('weddingDayDetails');
    return weddingPartyUpdateCollection.doc(weddingDetailsID).update({YourNameID: weddingpartyid});
  }

  updateYourFianceWeddingPartyID(weddingpartyid: string, UserID: string, weddingDetailsID: string) {
    let weddingPartyUpdateCollection = this.db.collection<Profile>('profile').doc(UserID).collection('weddingDayDetails');
    return weddingPartyUpdateCollection.doc(weddingDetailsID).update({FianceNameID: weddingpartyid});
  }
}
