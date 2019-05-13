import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { CoreModule } from 'core/core.module';
import { SharedModule } from 'shared/shared.module';

import { HotelSearchComponent } from './hotel-search.component';

describe('HotelSearchComponent', () => {
  let component: HotelSearchComponent;
  let fixture: ComponentFixture<HotelSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule.forRoot(), SharedModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HotelSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('hotel search component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('hotel search component should be able to filter cities opt', () => {
    component.cityCtrl.patchValue('mina');
    const mockSubs = component.filteredCities$.subscribe(hotels => {
      expect(hotels.length).toBeGreaterThan(1);
      if (mockSubs) {
        mockSubs.unsubscribe();
      }
    });
  });

  it('hotel search component should be able to select citiy', () => {
    component.selectCity({
      option: {
        viewValue: 'Minato'
      }
    } as MatAutocompleteSelectedEvent);

    expect(component.selectedCities).toEqual(['Minato']);
  });

  it('hotel search component should be able to handle existing selected city when selecting citiy', () => {
    component.selectedCities = ['Minato'];
    component.selectCity({
      option: {
        viewValue: 'Minato'
      }
    } as MatAutocompleteSelectedEvent);
    expect(component.selectedCities.length).toEqual(1);
  });

  it('hotel search component should be able to remove selected citiy', () => {
    component.selectedCities = ['Minato'];
    component.removeSelectedCity('Minato');
    expect(component.selectedCities.length).toEqual(0);
  });

  it('hotel search component should be able to handle non existing city when removing selected citiy', () => {
    component.selectedCities = ['Minato'];
    component.removeSelectedCity('Mock Non Existing');
    expect(component.selectedCities.length).toEqual(1);
  });
});
