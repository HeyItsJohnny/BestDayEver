import { Component, OnInit } from '@angular/core';
import { Dinner, DinnerService } from 'src/app/services/dinner.service';

@Component({
  selector: 'app-dinner-list',
  templateUrl: './dinner-list.page.html',
  styleUrls: ['./dinner-list.page.scss'],
})
export class DinnerListPage implements OnInit {

  dinners: Dinner[];

  constructor(private dinnerService: DinnerService) { }

  ngOnInit() {
    this.dinnerService.getDinners().subscribe(res => {
      this.dinners = res;
    });
  }
  remove(item) {
    this.dinnerService.removeDinner(item.id);
  }
}
