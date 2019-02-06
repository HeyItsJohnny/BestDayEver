import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Time } from '@angular/common';
import { Profile } from 'src/app/services/profile.service';
import { AngularFireAuth } from "angularfire2/auth";

export interface Budget {
  id?: string;
  Category: string;
  SubCategory: string;
  BudgetName: string;
  SearchName: string;
  EstimatedCost: number;
  ActualCost: number;
  Deposit: number;
  Comments: string;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor() { }
}
