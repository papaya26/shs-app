import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Competition } from 'interfaces/';

import { HotelService } from 'core/services';

@Component({
  selector: 'app-hotel-competition',
  templateUrl: './hotel-competition.component.html',
  styleUrls: ['./hotel-competition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelCompetitionComponent {
  @Input()
  public competition: Competition;

  @Input()
  public currencySign: string;

  @Input()
  public mostExpensive: boolean;

  @Input()
  public save: boolean;

  constructor(public hotelService: HotelService) {}
}
