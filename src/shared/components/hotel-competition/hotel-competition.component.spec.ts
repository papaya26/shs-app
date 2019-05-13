import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelCompetitionComponent } from './hotel-competition.component';

describe('HotelCompetitionComponent', () => {
  let component: HotelCompetitionComponent;
  let fixture: ComponentFixture<HotelCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelCompetitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
