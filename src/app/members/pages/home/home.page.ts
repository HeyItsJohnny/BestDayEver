import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Budget, BudgetService } from 'src/app/services/budget.service';
import { MenuController } from '@ionic/angular';
import { WeddingDayDetails, WeddingDayDetailsService } from 'src/app/services/wedding-day-details.service';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
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

  TotalCost: string;
  TotalOverUnderBudget: string;

  constructor(
    private budgetService: BudgetService,
    private weddingDayDetailsService: WeddingDayDetailsService,
    public menuController: MenuController) { }


  ionViewWillEnter() {
    this.menuController.enable(true);
    this.loadWeddingDay(); 
  }

  loadWeddingDay() {
    var wedDay = this.weddingDayDetailsService.getWeddingDay().subscribe(res => {
      this.weddingDay = res;
      this.getBudgetData(this.weddingDay.BudgetEstimate);
      wedDay.unsubscribe();
    });
  }

  getBudgetData(OverallBudget: number) {
    this.reloadTotalCostChart(OverallBudget);
  }

  reloadTotalCostChart(OverallBudget: number) {
    // Create the data table.
    var estdata = new google.visualization.DataTable();
    estdata.addColumn('string', 'Category');
    estdata.addColumn('number', '$$ against budget');   

   //All Chart Data
   this.budgetService.getAllChartData("Total").then(result => {
     let remainBudget = +OverallBudget - +result.TotalCost;
     if (remainBudget > 0) {
       estdata.addRow(["Remaining Budget",remainBudget]);
       this.TotalOverUnderBudget = "Under Budget by: " + remainBudget;
     } else {
       this.TotalOverUnderBudget = "Over Budget by: " + remainBudget;
     }
     this.TotalCost = "Total Cost: " + result.TotalCost;
     chart.draw(estdata, options);
   });

    //Ceremony
    this.budgetService.getChartData("Ceremony","Total").then(result => {
      estdata.addRow(["Ceremony",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Reception
    this.budgetService.getChartData("Reception","Total").then(result => {
      estdata.addRow(["Reception",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Stationary
    this.budgetService.getChartData("Stationary","Total").then(result => {
      estdata.addRow(["Stationary",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Clothes
    this.budgetService.getChartData("Clothes","Total").then(result => {
      estdata.addRow(["Clothes",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Beauty
    this.budgetService.getChartData("Beauty","Total").then(result => {
      estdata.addRow(["Beauty",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Flowers
    this.budgetService.getChartData("Flowers","Total").then(result => {
      estdata.addRow(["Flowers",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Photography/Videography
    this.budgetService.getChartData("Photography/Videography","Total").then(result => {
      estdata.addRow(["Photography/Videography",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Music
    this.budgetService.getChartData("Music","Total").then(result => {
      estdata.addRow(["Music",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Rentals
    this.budgetService.getChartData("Rentals","Total").then(result => {
      estdata.addRow(["Rentals",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Decor
    this.budgetService.getChartData("Decor","Total").then(result => {
      estdata.addRow(["Decor",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Misc. Celebrations
    this.budgetService.getChartData("Misc. Celebrations","Total").then(result => {
      estdata.addRow(["Misc. Celebrations",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Gift Favors
    this.budgetService.getChartData("Gifts & Favors","Total").then(result => {
      estdata.addRow(["Gifts & Favors",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Transportation
    this.budgetService.getChartData("Transportation","Total").then(result => {
      estdata.addRow(["Transportation",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Other Entertainment
    this.budgetService.getChartData("Other Entertainment","Total").then(result => {
      estdata.addRow(["Other Entertainment",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Destination Wedding
    this.budgetService.getChartData("Destination Wedding","Total").then(result => {
      estdata.addRow(["Destination Wedding",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Honeymoon
    this.budgetService.getChartData("Honeymoon","Total").then(result => {
      estdata.addRow(["Honeymoon",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Misc
    this.budgetService.getChartData("Miscallenous","Total").then(result => {
      estdata.addRow(["Miscallenous",result.TotalCost]);
      chart.draw(estdata, options);
    });

    // Set chart options
    var options = {
      'title':'Budget Chart',
       'width':600,
       'height':400,
       slices: {
         0: { color: 'grey' },
       }
     };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('act_cost_wedding_budget_percent_div'));
   }
  
}
