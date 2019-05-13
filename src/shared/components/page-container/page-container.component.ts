import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AppStore } from 'core/stores/app.store';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageContainerComponent {
  constructor(public appStore: AppStore) {}
}
