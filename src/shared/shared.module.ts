import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MobxAngularModule } from 'mobx-angular';
import { NgxStarsModule } from 'ngx-stars';

import { AnuglarMaterialModule } from './angular-material/angular-material.module';

import {
  HotelCardComponent,
  HotelCompetitionComponent,
  HotelSearchComponent,
  ListContainerComponent,
  PageContainerComponent,
  PageHeaderComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MobxAngularModule,

    AnuglarMaterialModule,
    NgxStarsModule
  ],
  declarations: [
    HotelCardComponent,
    HotelCompetitionComponent,
    HotelSearchComponent,
    ListContainerComponent,
    PageContainerComponent,
    PageHeaderComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MobxAngularModule,
    AnuglarMaterialModule,
    NgxStarsModule,

    HotelCardComponent,
    HotelCompetitionComponent,
    HotelSearchComponent,
    ListContainerComponent,
    PageContainerComponent,
    PageHeaderComponent
  ]
})
export class SharedModule {}
