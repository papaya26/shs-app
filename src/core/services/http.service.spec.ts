import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import {
  endpoints,
  mockHotels,
  mockHttpSuccess,
  mockHttpFailed,
  mockHttpError
} from 'constants/';

import { environment } from 'environments/environment';

import { HttpService } from './http.service';
import { MessageService } from './message.service';

describe('HttpService', () => {
  let httpService: HttpService;
  let messageService: MessageService;
  let httpTestingController: HttpTestingController;

  const mockMatSnackBar = {
    open: jasmine.createSpy('open')
  };

  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        HttpService,
        MessageService,
        { provide: MatSnackBar, useValue: mockMatSnackBar }
      ]
    })
      .compileComponents()
      .then(() => {
        httpTestingController = TestBed.get(HttpTestingController);
        httpService = TestBed.get(HttpService);
        messageService = TestBed.get(MessageService);
      })));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('http service should be created', () => {
    expect(httpService).toBeTruthy();
  });

  it('http service should be able to perform get http call', () => {
    httpService
      .get(endpoints.getAllHotels)
      .subscribe(hotels => expect(hotels).toEqual(mockHotels));

    const req = httpTestingController.expectOne(
      `${environment.api}${endpoints.getAllHotels}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockHotels, mockHttpSuccess);
  });

  it('http service should be able to handle http error while getting http call with non error event', () => {
    spyOn(messageService, 'popError');
    httpService
      .get(endpoints.getAllHotels)
      .subscribe(
        () => {},
        () => expect(messageService.popError).toHaveBeenCalled()
      );

    const req = httpTestingController.expectOne(
      `${environment.api}${endpoints.getAllHotels}`
    );
    req.flush(null, mockHttpFailed);
  });

  it('http service should be able to handle http error while getting http call with error event', () => {
    spyOn(messageService, 'popError');
    httpService
      .get(endpoints.getAllHotels)
      .subscribe(
        () => {},
        () => expect(messageService.popError).toHaveBeenCalled()
      );

    const req = httpTestingController.expectOne(
      `${environment.api}${endpoints.getAllHotels}`
    );
    req.flush(mockHttpError, mockHttpFailed);
  });
});
