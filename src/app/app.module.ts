import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from 'core/core.module';
import { SharedModule } from 'shared/shared.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, CoreModule.forRoot(), SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
