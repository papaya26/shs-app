import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { SharedModule } from 'shared/shared.module';

import { mockHotels } from 'constants/';

import { HotelService, HttpService, MessageService } from 'core/services/';

import { AppStore } from './app.store';
import { of, throwError } from 'rxjs';

describe('AppStore', () => {
  let appStore: AppStore;

  const mockMatSnackBar = {
    open: jasmine.createSpy('open', HotelService)
  };

  const mockHotelsService = {
    getFilteredHotels: jasmine
      .createSpy('getFilteredHotels')
      .and.returnValue(of('Mock Error'))
  };

  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedModule],
      providers: [
        { provide: HotelService, useValue: mockHotelsService },
        HttpService,
        MessageService,
        { provide: MatSnackBar, useValue: mockMatSnackBar },
        AppStore
      ]
    })
      .compileComponents()
      .then(() => {
        appStore = TestBed.get(AppStore);
      })));

  it('app store should be created', () => {
    appStore = TestBed.get(AppStore);
    expect(appStore).toBeTruthy();
  });

  it('app store should be able to set is loading', () => {
    appStore.setIsLoading(true);
    expect(appStore.isLoading$).toBeTruthy();
  });

  it('app store should be able to set header height', () => {
    const headerHeight = 64;
    appStore.setHeaderHeight(headerHeight);
    expect(appStore.headerHeight$).toEqual(headerHeight);
  });

  it('app store should be able to set currency', () => {
    const currency = 'SGD';
    appStore.setCurrency(currency);
    expect(appStore.currency$).toEqual(currency);
  });

  it('app store should be able to set cities', () => {
    const cities = ['Minato'];
    appStore.setCities(cities);
    expect(appStore.cities$).toEqual(cities);
  });

  it('app store should be able to set hotels', () => {
    appStore.setHotels(mockHotels);
    expect(appStore.hotels$).toEqual(mockHotels);
  });

  it('app store should be able to has search', () => {
    appStore.setHasSearched(true);
    expect(appStore.hasSearched$).toBeTruthy();
  });

  it('app store should be able to get hotels', () => {
    appStore.setCities(['Minato']);
    appStore.setCurrency('SGD');
    spyOn(appStore, 'setHasSearched');
    spyOn(appStore, 'setIsLoading');
    appStore.getHotels();
    expect(appStore.setHasSearched).toHaveBeenCalled();
    expect(appStore.setIsLoading).toHaveBeenCalled();
    expect(mockHotelsService.getFilteredHotels).toHaveBeenCalled();
  });
});
