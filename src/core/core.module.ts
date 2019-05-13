import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from 'shared/shared.module';

import { HotelService, HttpService, MessageService } from './services';

import { AppStore } from './stores/app.store';

@NgModule({
  imports: [BrowserAnimationsModule, HttpClientModule, SharedModule],
  exports: [BrowserAnimationsModule, HttpClientModule],
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [HotelService, HttpService, MessageService, AppStore]
    };
  }
}
