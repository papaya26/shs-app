import { Injectable } from '@angular/core';
import { action, observable, reaction, toJS } from 'mobx';
import { create, persist } from 'mobx-persist';

import { Hotel } from 'interfaces/';

import { HotelService } from 'core/services/hotel.service';

@Injectable()
export class AppStore {
  @observable
  public isLoading$: boolean;

  @observable
  public headerHeight$: number;

  @persist
  @observable
  public currency$ = 'USD';

  @observable
  public cities$: string[] = [];

  @observable
  public hotels$: Hotel[];

  @observable
  public hasSearched$: boolean;

  constructor(private hotelService: HotelService) {
    const hydrate = create();
    hydrate('currency$', this).then();
  }

  @action
  public setIsLoading(isLoading) {
    this.isLoading$ = isLoading;
  }

  @action
  public setHeaderHeight(headerHeight: number) {
    this.headerHeight$ = headerHeight;
  }

  @action
  public setCurrency(currency: string) {
    this.currency$ = currency;
    this.getHotels();
  }

  @action
  public setCities(cities: string[]) {
    this.cities$ = [...cities];
    this.getHotels();
  }

  @action setHotels(hotels: Hotel[]) {
    this.hotels$ = [...hotels];
  }

  @action
  public getHotels() {
    if (!this.cities$.length || !this.currency$) {
      return;
    }
    this.setHasSearched(true);
    this.setIsLoading(true);
    this.hotelService
      .getFilteredHotels(toJS(this.cities$), toJS(this.currency$))
      .subscribe(
        hotels => {
          this.setHotels(hotels);
          this.setIsLoading(false);
        },
        () => this.setIsLoading(false)
      );
  }

  @action
  public setHasSearched(hasSearched) {
    this.hasSearched$ = hasSearched;
  }
}
