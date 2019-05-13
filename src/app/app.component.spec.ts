import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppModule } from './app.module';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        appComponent = fixture.componentInstance;
      });
  }));

  it('app component should be created', () => {
    expect(appComponent).toBeTruthy();
  });
});
