import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CoreModule } from 'core/core.module';
import { SharedModule } from 'shared/shared.module';

import { HotelCompetitionComponent } from './hotel-competition.component';

describe('HotelCompetitionComponent', () => {
  let component: HotelCompetitionComponent;
  let fixture: ComponentFixture<HotelCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule.forRoot(), SharedModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HotelCompetitionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('hotel competition component should be created', () => {
    expect(component).toBeTruthy();
  });
});
