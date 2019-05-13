import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class MessageService {
  constructor(private matShackBar: MatSnackBar) {}

  public popError(message) {
    this.matShackBar.open(message, 'OK', {});
  }
}
