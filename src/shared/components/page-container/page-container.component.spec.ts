import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CoreModule } from 'core/core.module';
import { SharedModule } from 'shared/shared.module';

import { PageContainerComponent } from './page-container.component';

describe('PageContainerComponent', () => {
  let component: PageContainerComponent;
  let fixture: ComponentFixture<PageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule.forRoot(), SharedModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PageContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('page container component should be created', () => {
    expect(component).toBeTruthy();
  });
});
