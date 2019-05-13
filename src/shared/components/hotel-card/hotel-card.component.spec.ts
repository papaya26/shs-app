import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CoreModule } from 'core/core.module';
import { SharedModule } from 'shared/shared.module';

import { mockHotelsFilteredByMinatoAndSGD } from 'constants/';

import { HotelCardComponent } from './hotel-card.component';

describe('HotelCardComponent', () => {
  let component: HotelCardComponent;
  let fixture: ComponentFixture<HotelCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule.forRoot(), SharedModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HotelCardComponent);
        component = fixture.componentInstance;
        component.hotel = mockHotelsFilteredByMinatoAndSGD[0];
        fixture.detectChanges();
      });
  }));

  it('hotel card component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('hotel card component should be able to open others', () => {
    component.openOthers();
    expect(component.isOthersOpen).toBeTruthy();
  });

  it('hotel card component should be able to close others', () => {
    component.closeOthers();
    expect(component.isOthersOpen).toBeFalsy();
  });

  it('hotel card component should be able to create taxes and fees tooltip', () => {
    expect(component.getTaxesAndFeesToolTip()).toBeTruthy();
  });
});
