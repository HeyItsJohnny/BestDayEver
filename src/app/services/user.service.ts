import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Time } from '@angular/common';

export interface User {
  id?: string;
  Email: string;
  Name: string;
  DinnerDetailsID: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
}
