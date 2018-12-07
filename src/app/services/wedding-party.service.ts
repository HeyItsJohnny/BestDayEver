import { Injectable, Optional } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface WeddingParty {
  id?: string;
  Name: string;
  Email: string;
  PhoneNo: string;
  WeddingSide: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeddingPartyService {

  constructor() { }
}
