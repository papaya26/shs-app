import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';

import { AppStore } from 'core/stores/app.store';

import { currencies } from 'constants/';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderComponent implements AfterViewInit {
  @ViewChild('header', { read: ElementRef })
  public header: ElementRef;

  public currenciesOpts: string[];

  @HostListener('window:resize', ['$event'])
  public onResize() {
    this.updateHeaderHeight();
  }

  constructor(public appStore: AppStore) {
    this.currenciesOpts = currencies;
  }

  public ngAfterViewInit() {
    this.updateHeaderHeight();
  }

  private updateHeaderHeight() {
    if (this.header) {
      this.appStore.setHeaderHeight(this.header.nativeElement.clientHeight);
    }
  }

  public selectCurrency(currency) {
    this.appStore.setCurrency(currency);
  }
}
