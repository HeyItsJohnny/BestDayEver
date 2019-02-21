import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  constructor(
    private alertController: AlertController, 
    private afAuth: AngularFireAuth, 
    public menuController: MenuController,
    private router: Router) { }

  ngOnInit() {
    var user = this.afAuth.auth.currentUser;
    /*if (user == null) {
      console.log('THERE IS NO USER..');
      this.router.navigateByUrl('/Login');
    }*/
  }

  ionViewWillEnter() {
    this.menuController.enable(true);
  }
  
}
