import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CoreModule } from 'core/core.module';
import { SharedModule } from 'shared/shared.module';

import { ListContainerComponent } from './list-container.component';

describe('ListContainerComponent', () => {
  let component: ListContainerComponent;
  let fixture: ComponentFixture<ListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule.forRoot(), SharedModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ListContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('list container component should be created', () => {
    expect(component).toBeTruthy();
  });
});
