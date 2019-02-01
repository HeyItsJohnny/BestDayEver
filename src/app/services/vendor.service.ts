import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from 'src/app/services/profile.service';
import { AngularFireAuth } from "angularfire2/auth";
import { Time } from '@angular/common';

export interface Vendor {
  id?: string;
  Name: string;
  SearchName: string;
  Email: string;
  PhoneNo: string;
  Address1: string;
  Address2: string;
  AddressCity: string;
  AddressState: string;
  AddressPostCode: string;
  DateOfArrival: Date;
  TimeOfArrival: Time;
  Deposit: number;
  LiabilityInsurance: string;
  MethodOfPayment: string;
  ContactCategory: string;
  Category: string;
  Notes: string;
  Website: string;
  FlightDepartingAirline: string;
  FlightNumber: string;
  HotelWebsite: string;
  HotelRate: string;
  HotelConfirmationNumber: string;
  HotelPhoneNo: string;
  DateOfDeparture: Date;
  TimeOfDeparture: Time;
  IsBooked: Boolean;
  UpdatedAt: number;
  CreatedAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(
    public db: AngularFirestore,
    private afAuth: AngularFireAuth) { }

  getVendors() {
    var authUser = this.afAuth.auth.currentUser;

    return new Promise<any>((resolve, reject) => {
      this.db.collection<Profile>('profile').doc(authUser.uid).collection('vendors').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }
 
  getVendor(id) {
    var authUser = this.afAuth.auth.currentUser;
    let vendorsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('vendors');
    return vendorsCollection.doc<Vendor>(id).valueChanges();
  }

  addVendor(vendor: Vendor) {
    var tmp = vendor;
    tmp.SearchName = vendor.Name.toLowerCase();
    var authUser = this.afAuth.auth.currentUser;
    let vendorsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('vendors');
    return vendorsCollection.add(tmp);
  }

  updateVendor(vendor: Vendor, id: string) {
    var tmp = vendor;
    tmp.SearchName = vendor.Name.toLowerCase();
    var authUser = this.afAuth.auth.currentUser;
    let vendorsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('vendors');
    return vendorsCollection.doc(id).update(tmp);
  }

  removeVendor(id) {
    var authUser = this.afAuth.auth.currentUser;
    let vendorsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('vendors');
    return vendorsCollection.doc(id).delete();
  }

  searchVendorName(searchValue){
    console.log("Search Value: " + searchValue);
    var authUser = this.afAuth.auth.currentUser;
    return new Promise<any>((resolve, reject) => {
      this.db.collection<Profile>('profile').doc(authUser.uid).collection('vendors', ref => ref.where('SearchName', '>=', searchValue)
      .where('SearchName', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    })
  }
}
