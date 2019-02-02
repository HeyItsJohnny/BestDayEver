import { Component, OnInit } from '@angular/core';
import { WeddingDayDetails, WeddingDayDetailsService } from 'src/app/services/wedding-day-details.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-quick-start',
  templateUrl: './register-quick-start.page.html',
  styleUrls: ['./register-quick-start.page.scss'],
})
export class RegisterQuickStartPage implements OnInit {

  weddingDay: WeddingDayDetails = {
    WeddingPartyGroupdID: '',
    WeddingDate: null,
    EstimatedNoOfGuests: 0,
    YourName: '',
    YourNameID: '',
    BudgetEstimate: 0,
    FianceName: '',
    FianceNameID: '',
    ReceptionTime: null,
    DinnerTime: null,
    CocktailTime: null,
    WeddingInvitesSentOut: false,
    UpdatedAt: 0,
    CreatedAt: 0
  };
  weddingDayId = null;

  constructor(private route: ActivatedRoute, 
    private weddingDayDetailsService: WeddingDayDetailsService) { }

  ngOnInit() {

  }

}
