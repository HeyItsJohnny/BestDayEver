import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Vendor {
  id?: string;
  Name: string;
  Description: string;
  Email: string;
  PhoneNo: string;
  Address1: string;
  Address2: string;
  AddressCity: string;
  AddressState: string;
  AddressPostCode: string;
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

  constructor(db: AngularFirestore) { 
    this.vendorsCollection = db.collection<Vendor>('vendors');
 
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
 
  updateVendor(vendor: Vendor, id: string) {
    return this.vendorsCollection.doc(id).update(vendor);
  }
 
  addVendor(vendor: Vendor) {
    //Add to Profile Document
    return this.vendorsCollection.add(vendor);
  }
 
  removeVendor(id) {
    //Remove from Profile Document
    return this.vendorsCollection.doc(id).delete();
  }

}
