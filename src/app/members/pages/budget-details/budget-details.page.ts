import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Budget, BudgetService } from 'src/app/services/budget.service';


@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.page.html',
  styleUrls: ['./budget-details.page.scss'],
})
export class BudgetDetailsPage implements OnInit {
  
  budget: Budget = {
    Category: '',
    SubCategory: '',
    BudgetName: '',
    SearchName: '',
    EstimatedCost: 0,
    ActualCost: 0,
    Deposit: 0,
    Comments: ''
  };

  budgetId = null;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private nav: NavController, 
    private budgetService: BudgetService, 
    public alertController: AlertController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.budgetId = this.route.snapshot.params['id'];
    if (this.budgetId)  {
      this.loadBudget();
    }
  }

  async loadBudget() {   
    const loading = await this.loadingController.create({
      message: 'Loading Budget..'
    });
    await loading.present();
 
    this.budgetService.getBudget(this.budgetId).subscribe(res => {
      loading.dismiss();
      this.budget = res;
    })
  }

  async saveBudget() {
    const loading = await this.loadingController.create({
      message: 'Saving Budget..'
    });
    await loading.present();
 
    if (this.budgetId) {
      this.budgetService.updateBudget(this.budget, this.budgetId).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    }
  }

  async deleteBudget() {
    this.alertController.create({
      header: "Are you sure you want to delete this budget?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.budgetService.removeBudget(this.budgetId).then(() => {
              this.nav.goBack(true);
            });
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }
      ]
    }).then(alert => alert.present());
  }

}
