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
  private vendorsCollection: AngularFirestoreCollection<Vendor>;
  private vendors: Observable<Vendor[]>;

  constructor(
    db: AngularFirestore,
    private afAuth: AngularFireAuth) { 
    
    var authUser = this.afAuth.auth.currentUser;
    this.vendorsCollection = db.collection<Profile>('profile').doc(authUser.uid).collection('vendor');
 
    this.vendors = this.vendorsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getVendors() {
    return this.vendors;
  }
 
  getVendor(id) {
    return this.vendorsCollection.doc<Vendor>(id).valueChanges();
  }

  addVendor(vendor: Vendor) {
    return this.vendorsCollection.add(vendor);
  }

  updateVendor(vendor: Vendor, id: string) {
    return this.vendorsCollection.doc(id).update(vendor);
  }

  removeVendor(id) {
    return this.vendorsCollection.doc(id).delete();
  }
}
