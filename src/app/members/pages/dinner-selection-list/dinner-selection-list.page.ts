import { Component, OnInit } from '@angular/core';
import { Dinner, DinnerService } from 'src/app/services/dinner.service';

@Component({
  selector: 'app-dinner-selection-list',
  templateUrl: './dinner-selection-list.page.html',
  styleUrls: ['./dinner-selection-list.page.scss'],
})
export class DinnerSelectionListPage implements OnInit {

  dinners: Dinner[];

  constructor(private dinnerService: DinnerService) { }

  ngOnInit() {
    this.dinnerService.getDinners().subscribe(res => {
      this.dinners = res;
    });
  }

}
