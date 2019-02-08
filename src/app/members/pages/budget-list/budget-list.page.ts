import { Component, OnInit } from '@angular/core';
import { Budget, BudgetService } from 'src/app/services/budget.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.page.html',
  styleUrls: ['./budget-list.page.scss'],
})
export class BudgetListPage {

  budgets: Budget[];

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
    }

    addItem() {
      this.budgetService.startBudgetAdd();
    }
  
    viewDetails(item){
      this.router.navigateByUrl('/members/budgetDetails/' + item.payload.doc.id);
    }
}
