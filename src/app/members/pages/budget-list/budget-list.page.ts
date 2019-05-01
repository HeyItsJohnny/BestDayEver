import { Component, OnInit } from '@angular/core';
import { Budget, BudgetService } from 'src/app/services/budget.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { WeddingDayDetails, WeddingDayDetailsService } from 'src/app/services/wedding-day-details.service';
import { ProfileService } from 'src/app/services/profile.service';
import { MenuController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.page.html',
  styleUrls: ['./budget-list.page.scss'],
})
export class BudgetListPage {

  budgets: Budget[];
  searchCategory: string;

  weddingDay: WeddingDayDetails = {
    WeddingPartyGroupdID: '',
    WeddingDate: null,
    EstimatedNoOfGuests: 0,
    YourName: '',
    BudgetEstimate: 0,
    FianceName: '',
    ReceptionTime: null,
    DinnerTime: null,
    CocktailTime: null,
    WeddingInvitesSentOut: false,
    UpdatedAt: 0
  };
  weddingDayId = null;

  TotalEstimatedCost: string;
  TotalActualCost: string;
  EstimatedOverUnderBudget: string;
  ActualOverUnderBudget: string;
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
    private weddingDayDetailsService: WeddingDayDetailsService,
    private profileService: ProfileService, 
    public menuController: MenuController,
    public alertController: AlertController) { }

    ionViewWillEnter() {
      this.menuController.enable(true);
      var prof = this.profileService.getProfile().subscribe(res => {
        this.weddingDayId = res.WeddingID; 
        if (this.weddingDayId)  {
          this.loadWeddingDay();          
          prof.unsubscribe();
        }
      });
      
    }

    loadWeddingDay() {
      var wedDay = this.weddingDayDetailsService.getWeddingDay().subscribe(res => {
        this.weddingDay = res;
        this.getBudgetData(this.weddingDay.BudgetEstimate);
        wedDay.unsubscribe();
      });
    }

    getBudgetData(OverallBudget: number) {
      this.budgetService.getBudgets()
      .then(events => {
        this.budgets = events;
      })
      this.reloadEstimatePieChart(OverallBudget);
      this.reloadActualCostChart(OverallBudget);
    }

    reloadEstimatePieChart(OverallBudget: number) {
      // Create the data table.
      var estdata = new google.visualization.DataTable();
      estdata.addColumn('string', 'Category');
      estdata.addColumn('number', '$$ against budget');   

      //All Chart Data
      this.budgetService.getAllChartData("Estimated").then(result => {
        let remainBudget = +OverallBudget - +result.TotalCost;
        if (remainBudget > 0) {
          estdata.addRow(["Remaining Budget",remainBudget]);
          this.EstimatedOverUnderBudget = "Under Budget by: " + remainBudget;
        } else {
          this.EstimatedOverUnderBudget = "Over Budget by: " + remainBudget;
        }
        this.TotalEstimatedCost = "Total Estimated: " + result.TotalCost;
        chart.draw(estdata, options);
      });

      //Ceremony
      this.budgetService.getChartData("Ceremony","Estimated").then(result => {
        estdata.addRow(["Ceremony",result.TotalCost]);
        chart.draw(estdata, options);
      });

      //Reception
      this.budgetService.getChartData("Reception","Estimated").then(result => {
        estdata.addRow(["Reception",result.TotalCost]);
        chart.draw(estdata, options);
      });

      //Stationary
      this.budgetService.getChartData("Stationary","Estimated").then(result => {
        estdata.addRow(["Stationary",result.TotalCost]);
        chart.draw(estdata, options);
      });

      //Clothes
      this.budgetService.getChartData("Clothes","Estimated").then(result => {
        estdata.addRow(["Clothes",result.TotalCost]);
        chart.draw(estdata, options);
      });

      //Beauty
      this.budgetService.getChartData("Beauty","Estimated").then(result => {
        estdata.addRow(["Beauty",result.TotalCost]);
        chart.draw(estdata, options);
      });

      //Flowers
      this.budgetService.getChartData("Flowers","Estimated").then(result => {
        estdata.addRow(["Flowers",result.TotalCost]);
        chart.draw(estdata, options);
      });

      //Photography/Videography
      this.budgetService.getChartData("Photography/Videography","Estimated").then(result => {
        estdata.addRow(["Photography/Videography",result.TotalCost]);
        chart.draw(estdata, options);
      });

      //Music
      this.budgetService.getChartData("Music","Estimated").then(result => {
        estdata.addRow(["Music",result.TotalCost]);
        chart.draw(estdata, options);
      });

      //Rentals
      this.budgetService.getChartData("Rentals","Estimated").then(result => {
        estdata.addRow(["Rentals",result.TotalCost]);
        chart.draw(estdata, options);
      });

      //Decor
      this.budgetService.getChartData("Decor","Estimated").then(result => {
        estdata.addRow(["Decor",result.TotalCost]);
        chart.draw(estdata, options);
      });

      //Misc. Celebrations
      this.budgetService.getChartData("Misc. Celebrations","Estimated").then(result => {
        estdata.addRow(["Misc. Celebrations",result.TotalCost]);
        chart.draw(estdata, options);
      });

      //Gift Favors
      this.budgetService.getChartData("Gifts & Favors","Estimated").then(result => {
        estdata.addRow(["Gifts & Favors",result.TotalCost]);
        chart.draw(estdata, options);
      });

      //Transportation
      this.budgetService.getChartData("Transportation","Estimated").then(result => {
        estdata.addRow(["Transportation",result.TotalCost]);
        chart.draw(estdata, options);
      });

      //Other Entertainment
      this.budgetService.getChartData("Other Entertainment","Estimated").then(result => {
        estdata.addRow(["Other Entertainment",result.TotalCost]);
        chart.draw(estdata, options);
      });

      //Destination Wedding
      this.budgetService.getChartData("Destination Wedding","Estimated").then(result => {
        estdata.addRow(["Destination Wedding",result.TotalCost]);
        chart.draw(estdata, options);
      });

      //Honeymoon
      this.budgetService.getChartData("Honeymoon","Estimated").then(result => {
        estdata.addRow(["Honeymoon",result.TotalCost]);
        chart.draw(estdata, options);
      });

      //Misc
      this.budgetService.getChartData("Miscallenous","Estimated").then(result => {
        estdata.addRow(["Miscallenous",result.TotalCost]);
        chart.draw(estdata, options);
      });      

      // Set chart options
     var options = {
      'title':'Estiamted Cost',
      'width':600,
      'height':400,
      slices: {
        0: { color: 'grey' },
      }
     };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('est_cost_wedding_budget_percent_div'));
    }

    reloadActualCostChart(OverallBudget: number) {
     // Create the data table.
     var estdata = new google.visualization.DataTable();
     estdata.addColumn('string', 'Category');
     estdata.addColumn('number', '$$ against budget');   

    //All Chart Data
    this.budgetService.getAllChartData("Actual").then(result => {
      let remainBudget = +OverallBudget - +result.TotalCost;
      if (remainBudget > 0) {
        estdata.addRow(["Remaining Budget",remainBudget]);
        this.ActualOverUnderBudget = "Under Budget by: " + remainBudget;
      } else {
        this.ActualOverUnderBudget = "Over Budget by: " + remainBudget;
      }
      this.TotalActualCost = "Total Actual: " + result.TotalCost;
      chart.draw(estdata, options);
    });

     //Ceremony
     this.budgetService.getChartData("Ceremony","Actual").then(result => {
       estdata.addRow(["Ceremony",result.TotalCost]);
       chart.draw(estdata, options);
     });

     //Reception
     this.budgetService.getChartData("Reception","Actual").then(result => {
       estdata.addRow(["Reception",result.TotalCost]);
       chart.draw(estdata, options);
     });

     //Stationary
     this.budgetService.getChartData("Stationary","Actual").then(result => {
       estdata.addRow(["Stationary",result.TotalCost]);
       chart.draw(estdata, options);
     });

     //Clothes
     this.budgetService.getChartData("Clothes","Actual").then(result => {
       estdata.addRow(["Clothes",result.TotalCost]);
       chart.draw(estdata, options);
     });

     //Beauty
     this.budgetService.getChartData("Beauty","Actual").then(result => {
       estdata.addRow(["Beauty",result.TotalCost]);
       chart.draw(estdata, options);
     });

     //Flowers
     this.budgetService.getChartData("Flowers","Actual").then(result => {
       estdata.addRow(["Flowers",result.TotalCost]);
       chart.draw(estdata, options);
     });

     //Photography/Videography
     this.budgetService.getChartData("Photography/Videography","Actual").then(result => {
       estdata.addRow(["Photography/Videography",result.TotalCost]);
       chart.draw(estdata, options);
     });

     //Music
     this.budgetService.getChartData("Music","Actual").then(result => {
       estdata.addRow(["Music",result.TotalCost]);
       chart.draw(estdata, options);
     });

     //Rentals
     this.budgetService.getChartData("Rentals","Actual").then(result => {
       estdata.addRow(["Rentals",result.TotalCost]);
       chart.draw(estdata, options);
     });

     //Decor
     this.budgetService.getChartData("Decor","Actual").then(result => {
       estdata.addRow(["Decor",result.TotalCost]);
       chart.draw(estdata, options);
     });

     //Misc. Celebrations
     this.budgetService.getChartData("Misc. Celebrations","Actual").then(result => {
       estdata.addRow(["Misc. Celebrations",result.TotalCost]);
       chart.draw(estdata, options);
     });

     //Gift Favors
     this.budgetService.getChartData("Gifts & Favors","Actual").then(result => {
       estdata.addRow(["Gifts & Favors",result.TotalCost]);
       chart.draw(estdata, options);
     });

     //Transportation
     this.budgetService.getChartData("Transportation","Actual").then(result => {
       estdata.addRow(["Transportation",result.TotalCost]);
       chart.draw(estdata, options);
     });

     //Other Entertainment
     this.budgetService.getChartData("Other Entertainment","Actual").then(result => {
       estdata.addRow(["Other Entertainment",result.TotalCost]);
       chart.draw(estdata, options);
     });

     //Destination Wedding
     this.budgetService.getChartData("Destination Wedding","Actual").then(result => {
       estdata.addRow(["Destination Wedding",result.TotalCost]);
       chart.draw(estdata, options);
     });

     //Honeymoon
     this.budgetService.getChartData("Honeymoon","Actual").then(result => {
       estdata.addRow(["Honeymoon",result.TotalCost]);
       chart.draw(estdata, options);
     });

     //Misc
     this.budgetService.getChartData("Miscallenous","Actual").then(result => {
       estdata.addRow(["Miscallenous",result.TotalCost]);
       chart.draw(estdata, options);
     });

     // Set chart options
     var options = {
       'title':'Actual Cost',
        'width':600,
        'height':400,
        slices: {
          0: { color: 'grey' },
        }
      };

     // Instantiate and draw our chart, passing in some options.
     var chart = new google.visualization.PieChart(document.getElementById('act_cost_wedding_budget_percent_div'));
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
              this.getBudgetData(this.weddingDay.BudgetEstimate);
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
              this.getBudgetData(this.weddingDay.BudgetEstimate);
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
              this.getBudgetData(this.weddingDay.BudgetEstimate);  
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
              this.getBudgetData(this.weddingDay.BudgetEstimate);
            }
          }
        ]
      }).then(alert => alert.present());
    }

    getItems(searchbar) {
      console.log("Saerch Category: " + this.searchCategory);
      if (searchbar.srcElement.value == "") {
        this.getBudgetData(this.weddingDay.BudgetEstimate);
      } else {
        var value = searchbar.srcElement.value;
        var valueTmp: string;
        valueTmp = value.toLowerCase();   
    
        if ((this.searchCategory == 'category') || (this.searchCategory == null)) {
          this.budgetService.searchBudgetCategoryName(valueTmp).then(res => {
            this.budgets = res;
          })
        } else if (this.searchCategory == 'subcategory') {
          this.budgetService.searchBudgetSubCategoryName(valueTmp).then(res => {
            this.budgets = res;
          })
        } else if (this.searchCategory == 'budgetName') {
          this.budgetService.searchBudgetName(valueTmp).then(res => {
            this.budgets = res;
          })
        }
        
      }
    }
  
    viewDetails(item){
      this.router.navigateByUrl('/members/budgetDetails/' + item.payload.doc.id);
    }
}
