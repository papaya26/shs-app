import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit
} from '@angular/core';

import { Hotel, Savings } from 'interfaces/';

import { HotelService } from 'core/services/hotel.service';
@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelCardComponent implements OnInit {
  @Input()
  public hotel: Hotel;

  public savings: Savings;
  public isOthersOpen: boolean;
  public activeOthersIndex: number;

  constructor(public hotelService: HotelService) {
    this.activeOthersIndex = 0;
  }

  public ngOnInit() {
    this.computeSavings();
  }

  private computeSavings() {
    if (this.hotel.competition) {
      const mostExpensive = this.hotel.competition[
        this.hotel.competition.length - 1
      ];
      if (mostExpensive && mostExpensive.name !== 'SHS') {
        const shs = this.hotel.competition.find(c => c.name === 'SHS');
        this.savings = {
          mostExpensive,
          shs
        };
      }
    }
  }

  public openOthers(tabIndex: number = 0) {
    this.activeOthersIndex = tabIndex;
    this.isOthersOpen = true;
  }

  public closeOthers() {
    this.isOthersOpen = false;
  }

  public getTaxesAndFeesToolTip() {
    if (this.hotel.taxes_and_fees) {
      return `Tax: ${
        this.hotel.currencySign ? this.hotel.currencySign + ' ' : ''
      }${this.hotel.taxes_and_fees.tax} \n
          Hotel Fees: ${
            this.hotel.currencySign ? this.hotel.currencySign + ' ' : ''
          }${this.hotel.taxes_and_fees.hotel_fees}`;
    }
  }
}
