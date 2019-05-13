import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material';

import {
  endpoints,
  mockHotels,
  mockHttpSuccess,
  mockUSDPrices,
  mockSGDPrices,
  mockHotelsFilteredByMinatoAndUSD,
  mockHotelsFilteredByMinatoAndSGD
} from 'constants/';

import { environment } from 'environments/environment';

import { HotelService } from './hotel.service';
import { HttpService } from './http.service';
import { MessageService } from './message.service';

describe('HotelService', () => {
  let hotelService: HotelService;
  let httpTestingController: HttpTestingController;

  const mockMatSnackBar = {
    open: jasmine.createSpy('open')
  };

  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HotelService,
        HttpService,
        MessageService,
        { provide: MatSnackBar, useValue: mockMatSnackBar }
      ]
    })
      .compileComponents()
      .then(() => {
        httpTestingController = TestBed.get(HttpTestingController);
        hotelService = TestBed.get(HotelService);
      })));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('hotel service should be created', () => {
    expect(hotelService).toBeTruthy();
  });

  it('hotel service should be able to get all hotels', () => {
    hotelService
      .getAllHotels()
      .subscribe(hotels => expect(hotels).toEqual(mockHotels));

    const req = httpTestingController.expectOne(
      `${environment.api}${endpoints.getAllHotels}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockHotels, mockHttpSuccess);
  });

  it('hotel service should be able to get all hotel rates by currency', () => {
    const currency = 'USD';
    hotelService
      .getHotelRates(currency)
      .subscribe(hotelRates => expect(hotelRates).toEqual(mockUSDPrices));

    const req = httpTestingController.expectOne(
      `${environment.api}${endpoints.getHotelsRate}/${currency}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockUSDPrices, mockHttpSuccess);
  });

  it('hotel service should be able to handle empty responses from get all hotels and get hotel rates when getting filtered hotels', () => {
    const currency = 'USD';
    hotelService
      .getFilteredHotels([], currency)
      .subscribe(hotels => expect(hotels).toEqual([]));

    let req = httpTestingController.expectOne(
      `${environment.api}${endpoints.getAllHotels}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush([], mockHttpSuccess);

    req = httpTestingController.expectOne(
      `${environment.api}${endpoints.getHotelsRate}/${currency}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush([], mockHttpSuccess);
  });

  it('hotel service should be able to get filtered hotels by minato city and USD', () => {
    const cities = ['Minato'];
    const currency = 'USD';

    hotelService.getFilteredHotels(cities, currency).subscribe(hotels => {
      expect(hotels).toEqual(mockHotelsFilteredByMinatoAndUSD);
    });

    let req = httpTestingController.expectOne(
      `${environment.api}${endpoints.getAllHotels}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockHotels, mockHttpSuccess);

    req = httpTestingController.expectOne(
      `${environment.api}${endpoints.getHotelsRate}/${currency}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockUSDPrices, mockHttpSuccess);
  });

  it('hotel service should be able to get filtered hotels by minato city and SGD', () => {
    const cities = ['Minato'];
    const currency = 'SGD';

    hotelService
      .getFilteredHotels(cities, currency)
      .subscribe(hotels =>
        expect(hotels).toEqual(mockHotelsFilteredByMinatoAndSGD)
      );

    let req = httpTestingController.expectOne(
      `${environment.api}${endpoints.getAllHotels}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockHotels, mockHttpSuccess);

    req = httpTestingController.expectOne(
      `${environment.api}${endpoints.getHotelsRate}/${currency}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockSGDPrices, mockHttpSuccess);
  });

  it('hotel service should be able to format price', () => {
    expect(hotelService.formatPrice('$', 1)).toEqual('$ 1');
  });
});
