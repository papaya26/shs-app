import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith, takeWhile } from 'rxjs/operators';

import { cities } from 'constants/';

import { AppStore } from 'core/stores/app.store';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelSearchComponent implements OnInit, OnDestroy {
  @ViewChild('citiesInput') citiesInput: ElementRef<HTMLInputElement>;

  public cityCtrl: FormControl;
  public citiesOpt: string[];
  public selectedCities: string[];
  public filteredCities$: Observable<string[]>;
  public selectedCities$: BehaviorSubject<string[]>;

  private isAlive: boolean;

  constructor(private appStore: AppStore) {
    this.cityCtrl = new FormControl();
    this.citiesOpt = cities;
    this.selectedCities = [];
    this.selectedCities$ = new BehaviorSubject<string[]>([]);
    this.isAlive = true;
  }

  public ngOnInit() {
    this.filteredCities$ = this.cityCtrl.valueChanges.pipe(
      takeWhile(() => this.isAlive),
      startWith(''),
      map(city => (city ? this.filterCity(city) : this.citiesOpt.slice()))
    );
  }

  public ngOnDestroy() {
    this.isAlive = false;
  }

  private filterCity(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.citiesOpt.filter(
      city => city.toLowerCase().indexOf(filterValue) !== -1
    );
  }

  public selectCity(event: MatAutocompleteSelectedEvent) {
    const newCity = event.option.viewValue;
    this.citiesInput.nativeElement.value = '';
    this.cityCtrl.setValue(null);
    if (this.selectedCities.indexOf(newCity) === -1) {
      this.selectedCities.push(newCity);
      this.updateSelectedCities();
    }
  }

  public removeSelectedCity(city: string) {
    const index = this.selectedCities.indexOf(city);

    if (index >= 0) {
      this.selectedCities.splice(index, 1);
      this.updateSelectedCities();
    }
  }

  private updateSelectedCities() {
    this.appStore.setCities(this.selectedCities);
    this.selectedCities$.next(this.selectedCities);
  }
}
