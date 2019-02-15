import { Component, OnInit } from '@angular/core';
import { Budget, BudgetService } from 'src/app/services/budget.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

declare var google;

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.page.html',
  styleUrls: ['./budget-list.page.scss'],
})
export class BudgetListPage {

  budgets: Budget[];

  categoryArray: string[] = ["Ceremony","Reception","Stationary","Clothes","Beauty","Flowers","Photography/Videography","Music","Rentals","Decor","Misc. Celebrations","Gifts & Favors","Transportation","Misc. Party Entertainment","Destination Weddings","Honeymoon","Miscallaneous"];
  subcategoryCeremonyArray: string[] = ["Ceremony Location Fees","Officiant Dues","Marriage License","Chuppah or Alter","Ceremony Musicians","Other"];
  subcategoryReceptionArray: string[] = ["Reception Location", "Food", "Beverages", "Catering Staff", "Catering Manager", "Cake", "Bartenders", "Musicians/DJ", "On-Site Coordinator", "Coatroom Attendants", "Bathroom Attendants", "Wedding Night Hotel Room", "Other"];
  subcategoryStationaryArray: string[] = ["Save-The-Dates","Wedding Invites","Wedding Announcements","Calligraphy","Postage","Thank-you Notes","Programs","Menus","Seating Cards","Place Cards","Table Numbers","Other"];
  subcategoryClothesArray: string[] = ["Rings-his","Rings-hers","Wedding Gown","Shoes","Alterations","Shoes","Headpiece and veil","Lingerie/Foundation/Hosiery","Jewelry","Handbag","Other bridal accessories","Tuxedo for Groom","Shoes for Groom","Other Accessories for Groom","Bridesmaids' dresses","Groomsmen's Tuxedos","Other"];
  subcategoryBeautyArray: string[] = ["Hairstylists","Mani/Pedi","Makeup","Spa treatments","Other"];
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
    private budgetService: BudgetService,
    private router: Router,
    public alertController: AlertController) { }

    ionViewWillEnter() {
      this.getBudgetData();
    }

    getBudgetData() {
      this.budgetService.getBudgets()
      .then(events => {
        this.budgets = events;
      })
      this.reloadPieChart();
      //this.reloadActCostChart();
      //this.reloadDepositChart();
    }

    reloadPieChart() {
      // Create the data table.
      var estdata = new google.visualization.DataTable();
      estdata.addColumn('string', 'Category');
      estdata.addColumn('number', '% against wedding budget');   
      estdata.addRow(this.budgetService.getCeremonyRow("Estimated"));
      estdata.addRow(this.budgetService.getReceptionRow("Estimated"));   
      //estdata.addRow(this.budgetService.getStationaryRow("Estimated")); 
      //estdata.addRow(this.budgetService.getClothesRow("Estimated")); 
      //estdata.addRow(this.budgetService.getBeautyRow("Estimated")); 
      //estdata.addRow(this.budgetService.getFlowersRow("Estimated")); 
      //estdata.addRow(this.budgetService.getPhotoVideoRow("Estimated")); 
      //estdata.addRow(this.budgetService.getMusicRow("Estimated")); 
      //estdata.addRow(this.budgetService.getRentalsRow("Estimated")); 
      //estdata.addRow(this.budgetService.getDecorRow("Estimated")); 
      //estdata.addRow(this.budgetService.getMiscCelebrateRow("Estimated")); 
      //estdata.addRow(this.budgetService.getGiftsFavorsRow("Estimated")); 
      //estdata.addRow(this.budgetService.getTransportationRow("Estimated")); 
      //estdata.addRow(this.budgetService.getOtherEntertainRow("Estimated")); 
      //estdata.addRow(this.budgetService.getDestinationWeddingRow("Estimated")); 
      //estdata.addRow(this.budgetService.getHoneymoonRow("Estimated")); 
      //estdata.addRow(this.budgetService.getMiscRow("Estimated")); 

      // Set chart options
      var options = {'title':'Estimated Cost vs. overall wedding budget',
                    'width':900,
                    'height':500};

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('est_cost_wedding_budget_percent_div'));
      chart.draw(estdata, options);
    }

    reloadActCostChart() {
      // Create the data table.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Category');
      data.addColumn('number', '% against wedding budget');      
      data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
      ]);

      // Set chart options
      var options = {'title':'Actual Cost vs. overall wedding budget',
                    'width':400,
                    'height':300};

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('act_cost_wedding_budget_percent_div'));
      chart.draw(data, options);
    }

    async addItem() {
      var options = {
        header: "Budget Category",
        subHeader: "Please select a budget category",
        inputs: [],
        buttons: [
          {
            text: 'Ok',
            handler: (data: any) => {
              this.startSubcategorySelection(data);
              this.getBudgetData();
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

    async startSubcategorySelection(category: string) {
      var options = {
        header: category + " Subcategory",
        inputs: [],
        buttons: [
          {
            text: 'Ok',
            handler: (data: any) => {
              this.subcategoryOtherLogic(category,data);
              this.getBudgetData();
            }
          }
        ]
      };
    
  
      switch(category) {
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

    subcategoryOtherLogic(category: string, subcategory: string) {
      if (subcategory == "Other") {
        this.AddSubcategoryOtherName(category);
      } else {
        this.AddBudget(category,subcategory);
      }
    }

    AddSubcategoryOtherName(category: string) {
      this.alertController.create({
        header: 'Please enter a subcategory',
        inputs: [
          {
            name: 'subcategory',
            type: 'text',
            placeholder: 'Subcategory'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              this.AddBudget(category, data.subcategory);   
              this.getBudgetData();  
            }
          }
        ]
      }).then(alert => alert.present());
    }
  
    AddBudget(category: string, subcategory: string) {
      this.alertController.create({
        header: 'Please enter budget details',
        inputs: [
          {
            name: 'category',
            value: category,
            type: 'text',
            disabled: true,
            placeholder: 'Category'
          },
          {
            name: 'subcategory',
            value: subcategory,
            type: 'text',
            disabled: true,
            placeholder: 'Subcategory'
          },
          {
            name: 'budgetname',
            type: 'text',
            placeholder: 'Name'
          },
          {
            name: 'estcost',
            type: 'number',
            placeholder: 'Estimated Cost'
          },
          {
            name: 'actcost',
            type: 'number',
            placeholder: 'Actual Cost'
          },
          {
            name: 'deposit',
            type: 'number',
            placeholder: 'Deposit'
          },
          {
            name: 'comments',
            type: 'text',
            placeholder: 'Comments'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              var dinnerObj: Budget = {
                Category: data.category,
                SubCategory: data.subcategory,
                BudgetName: data.budgetname,
                SearchCategoryName: '',
                SearchSubCategoryName: '',
                SearchName: '',
                EstimatedCost: data.estcost,
                ActualCost: data.actcost,
                Deposit: data.deposit,
                Comments: data.comments
              };       
              this.budgetService.addBudget(dinnerObj);  
              this.budgets.push(dinnerObj);
              this.getBudgetData();
            }
          }
        ]
      }).then(alert => alert.present());
    }
  
    viewDetails(item){
      this.router.navigateByUrl('/members/budgetDetails/' + item.payload.doc.id);
    }
}
