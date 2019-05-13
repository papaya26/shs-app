import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AppStore } from 'core/stores/app.store';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListContainerComponent {
  constructor(public appStore: AppStore) {}
}
