import { Injectable } from '@angular/core';
import { forkJoin, of, Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { endpoints } from 'constants/';

import { HttpService } from './http.service';

import { Competition, Hotel, Price } from 'interfaces/';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  constructor(private httpService: HttpService) {}

  public getAllHotels(): Observable<any> {
    return this.httpService.get(`${endpoints.getAllHotels}`);
  }

  public getHotelRates(currency: string): Observable<any> {
    return this.httpService.get(`${endpoints.getHotelsRate}/${currency}`);
  }

  public getFilteredHotels(
    cities: string[],
    currency: string
  ): Observable<Hotel[]> {
    return forkJoin(this.getAllHotels(), this.getHotelRates(currency)).pipe(
      take(1),
      mergeMap(res =>
        of(this.transformHotels(res[0], res[1], cities, currency))
      )
    );
  }

  private transformHotels(
    hotels: Hotel[] = [],
    prices: Price[] = [],
    cities: string[],
    currency: string
  ): Hotel[] {
    return this.filterByCurrency(
      this.filterHotelsByCities(hotels, cities),
      prices,
      currency
    );
  }

  private filterHotelsByCities(hotels: Hotel[], cities: string[]): Hotel[] {
    if (!hotels.length || !cities.length) {
      return hotels;
    }

    return hotels.filter(hotel => {
      let found = false;
      for (const city of cities) {
        if (found) {
          break;
        }
        found = hotel.address.toLowerCase().indexOf(city.toLowerCase()) !== -1;
      }
      return found;
    });
  }

  private filterByCurrency(
    hotels: Hotel[],
    prices: Price[],
    currency: string
  ): Hotel[] {
    if (!hotels.length || !prices.length) {
      return hotels;
    }

    const filteredHotels: Hotel[] = [];
    const unavailableHotelRates: Hotel[] = [];

    for (const hotel of hotels) {
      const hotelPrice = prices.find(price => price.id === hotel.id);

      if (hotelPrice) {
        const currencySign = this.getCurrencySign(currency);
        this.initHotelPriceDetails(hotel, hotelPrice, currencySign);
        hotel.competition = this.transformCompetitorPrices(
          hotelPrice,
          currency
        );
        filteredHotels.push(hotel);
      } else {
        unavailableHotelRates.push(hotel);
      }
    }
    return [...filteredHotels, ...unavailableHotelRates];
  }

  private transformCompetitorPrices(
    hotelPrice: Price,
    currency: string
  ): Competition[] {
    const competition: Competition[] = [];
    const roundOffByHundreds = currency === 'KRW';

    hotelPrice.price = this.roundOff(hotelPrice.price, roundOffByHundreds);

    for (const competitor in hotelPrice.competitors) {
      if (competitor) {
        hotelPrice.competitors[competitor] = this.roundOff(
          hotelPrice.competitors[competitor],
          roundOffByHundreds
        );
        competition.push({
          name: competitor,
          price: hotelPrice.competitors[competitor]
        });
      }
    }

    if (competition.length) {
      competition.push({
        name: 'SHS',
        price: hotelPrice.price
      });
      competition.sort((a, b) => (a.price > b.price ? 1 : -1));
    }
    return competition;
  }

  private initHotelPriceDetails(hotel: Hotel, hotelPrice: Price, currencySign) {
    hotel.price = hotelPrice.price;
    if (hotelPrice.taxes_and_fees) {
      hotel.taxes_and_fees = hotelPrice.taxes_and_fees;
    }
    hotel.currencySign = currencySign;
  }

  private roundOff(value: number, byHundreds: boolean = false) {
    return byHundreds ? Math.round(value / 100) * 100 : Math.round(value);
  }

  private getCurrencySign(currency: string) {
    switch (currency) {
      case 'CNY':
        return 'Y';
      case 'KRW':
        return 'W';
      case 'SGD':
        return 'S$';
      case 'USD':
        return '$';
    }
  }

  public formatPrice(currencySign: string, price: number) {
    if (!currencySign && !price) {
      return '';
    }
    return `${currencySign ? currencySign + ' ' : ''}${price}`;
  }
}
