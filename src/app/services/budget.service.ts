import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Time } from '@angular/common';
import { Profile } from 'src/app/services/profile.service';
import { AngularFireAuth } from "angularfire2/auth";
import { AlertController } from '@ionic/angular';

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

  private budgetsCollection: AngularFirestoreCollection<Budget>;
  private budgets: Observable<Budget[]>;

  categoryArray: string[] = ["Ceremony","Reception","Stationary","Clothes","Beauty","Flowers","Photography/Videography","Music","Rentals","Decor","Misc. Celebrations","Gifts & Favors","Transportation","Misc. Party Entertainment","Destination Weddings","Honeymoon","Miscallaneous"];
  subcategoryCeremonyArray: string[] = ["Ceremony Location Fees","Officiant Fee/Donation","Marriage License","Chuppah or Alter","Ceremony Musicians","Other"];
  subcategoryReceptionArray: string[] = ["Reception Location", "Food", "Beverages", "Catering Staff", "Catering Manager", "Cake", "Bartenders", "Musicians/DJ", "On-Site Coordinator", "Coatroom Attendants", "Bathroom Attendants", "Wedding Night Hotel Room", "Other"];
  subcategoryStationaryArray: string[] = ["Save-The-Date Cards","Wedding Invitations and Enclosures","Wedding Announcements","Calligraphy","Postage","Thank-you Notes","Programs","Menus","Seating Cards","Place Cards","Table Numbers","Other"];
  subcategoryClothesArray: string[] = ["Rings-his","Rings-hers","Wedding Gown","Shoes","Alterations","Shoes","Headpiece and veil","Lingerie/Foundation/Hosiery","Jewelry","Handbag","Other bridal accessories","Tuxedo for Groom","Shoes for Groom","Other Accessories for Groom","Bridesmaids' dresses","Groomsmen's Tuxedos","Other"];
  subcategoryBeautyArray: string[] = ["Hairstylists","Manicure and pedicure for bride","Makeup Artist(s)","Facials and other spa treatments","Other"];
  subcategoryFlowersArray: string[] = ["Ceremony Flowers","Bride's Bouquent","Bridemaids' Bouquent","Boutonnieres","Corsages for mothers","Wreath and petals for flower girl","Cocktail flowers","Reception flowers","After-party flowers", "Miscellaneous flowers","Chuppah flowers","Other"];
  subcategoryPhotoVideoArray: string[] = ["Photographer", "Additioanl prints/albums","Videographer","Additional copies of video","Other"];
  subcategoryMusicArray: string[] = ["Ceremony","Cocktail hour","Reception","After-party","Other"];
  subcategoryRentalsArray: string[] = ["Tent","Chair","Tables","China","Glassware","Flatware","Dance floor","Furnature","Portable Toilets","Miscellaneous rentals","Linen rentals","Napkins","Chair Covers","Chair sashes","Seating-card table linens","Cocktail table linens","Cake table linens","Reception table linens","Other"];
  subcategoryDecorArray: string[] = ["Aisle runner","Candles","Lighting","Reception","Coat Check","Paper cocktail napkins","Guest towels for bathrooms","Guest book and pen","Other"];
  subcategoryMiscCelebrateArray: string[] = ["Engagement Party","Bridal Shower","Bachelorette Party","Bachelor Party","Bridal Luncheon","Other"];
  subcategoryGiftsFavorsArray: string[] = ["Gift for the bride","Gift for the groom","Bridemaids' gifts","Groomsmen's gifts","Flower girl gifts","Ring bearer gifts","Parents' gifts","Shower hostess gifts","Gifts for ushers and other helpers","Welcome gifts for out-of-towners","Other"];
  subcategoryTransportationArray: string[] = ["For couple","For bridal party","For guests","Valet Parking","Other"];
  subcategoryOtherEnterainArray: string[] = ["Bridesmaid luncheon","Rehearsal dinner location","Rehearsal dinner invintation","Rehearsal dinner flowers","Rehearsal dinner food","Rehearsal dinner beverages","Rehearsal dinner music and/or flowers","Other rehearsal dinner expenses","Day-after brunch location","Day-after brunch catering","Day-after brunch flowers (if not reusing)","Other day-after brunch expenses","Other"];
  subcategoryDestinationWeddingArray: string[] = ["Scouting costs","Long-distance transportation","Local transportation","Lodging for bride and groom","Shipping supplies to site","Other"];
  subcategoryHoneymoonArray: string[]= ["Travel","Lodging","Meals","Activities","Gratuities","Other"];
  subcategoryMiscArray: string[] = ["Miscallaneous tips","Wedding planner","Wedding insurance","Honeymoon insurance","Other"];

  constructor(
    public db: AngularFirestore,
    public alertController: AlertController,
    private afAuth: AngularFireAuth) { 
      var authUser = this.afAuth.auth.currentUser;
      this.budgetsCollection = db.collection<Profile>('profile').doc(authUser.uid).collection('budgets');

      this.budgets = this.budgetsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }

  getBudgetsToDisplay() {
    return this.budgets;
  }

  getBudgets() {
    var authUser = this.afAuth.auth.currentUser;

    return new Promise<any>((resolve, reject) => {
      this.db.collection<Profile>('profile').doc(authUser.uid).collection('budgets').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }

  getBudget(id) {
    var authUser = this.afAuth.auth.currentUser;
    let BudgetsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('budgets');
    return BudgetsCollection.doc<Budget>(id).valueChanges();
  }

  updateBudget(budget: Budget, id: string) {
    var tmp = budget;
    tmp.SearchName = budget.BudgetName.toLowerCase();
    var authUser = this.afAuth.auth.currentUser;
    let BudgetsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('budgets');
    return BudgetsCollection.doc(id).update(tmp);
  }

  removeBudget(id) {
    var authUser = this.afAuth.auth.currentUser;
    let BudgetsCollection = this.db.collection<Profile>('profile').doc(authUser.uid).collection('budgets');
    return BudgetsCollection.doc(id).delete();
  }

  searchBudgetName(searchValue){
    var authUser = this.afAuth.auth.currentUser;
    return new Promise<any>((resolve, reject) => {
      this.db.collection<Profile>('profile').doc(authUser.uid).collection('budgets', ref => ref.where('SearchName', '>=', searchValue)
      .where('SearchName', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    })
  }

  async startBudgetAdd() {
    var options = {
      header: "Budget Category",
      subHeader: "Please select a budget category",
      inputs: [],
      buttons: [
        {
          text: 'Ok',
          handler: (data: any) => {
            this.startSubcategorySelection(data);
          }
        }
      ]
    };
  
    for (let item of this.categoryArray) {
      options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
    }

    let alert = await this.alertController.create(options);
    await alert.present();
  }

  async startSubcategorySelection(subcat: string) {
    var options = {
      header: subcat + " Subcategory",
      inputs: [],
      buttons: [
        {
          text: 'Ok',
          handler: (data: any) => {
            console.log('Data: ' + data);
          }
        }
      ]
    };
  

    switch(subcat) {
      case "Ceremony": {
        for (let item of this.subcategoryCeremonyArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Reception": {
        for (let item of this.subcategoryReceptionArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Stationary": {
        for (let item of this.subcategoryStationaryArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Clothes": {
        for (let item of this.subcategoryClothesArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Beauty": {
        for (let item of this.subcategoryBeautyArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Flowers": {
        for (let item of this.subcategoryFlowersArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Photography/Videography": {
        for (let item of this.subcategoryPhotoVideoArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Music": {
        for (let item of this.subcategoryMusicArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Rentals": {
        for (let item of this.subcategoryRentalsArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Decor": {
        for (let item of this.subcategoryDecorArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Misc. Celebrations": {
        for (let item of this.subcategoryMiscCelebrateArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Gifts & Favors": {
        for (let item of this.subcategoryGiftsFavorsArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Transportation": {
        for (let item of this.subcategoryTransportationArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Misc. Party Entertainment": {
        for (let item of this.subcategoryOtherEnterainArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Destination Weddings": {
        for (let item of this.subcategoryDestinationWeddingArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Honeymoon": {
        for (let item of this.subcategoryHoneymoonArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Miscallaneous": {
        for (let item of this.subcategoryMiscArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
    }

    let alert = await this.alertController.create(options);
    await alert.present();
  }

}
