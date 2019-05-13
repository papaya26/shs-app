import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { environment } from 'environments/environment';

import { MessageService } from './message.service';

@Injectable()
export class HttpService {
  private httpHeaders: HttpHeaders;

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public get(url) {
    return this.httpClient
      .get(`${environment.api}${url}`, {
        headers: this.httpHeaders
      })
      .pipe(
        take(1),
        catchError(err => this.handleError(err))
      );
  }

  private handleError(err) {
    this.messageService.popError(
      err && err.error
        ? err.error.message || 'Opss! Something went wrong'
        : 'Opss! Something went wrong'
    );
    return throwError(err.error);
  }
}
