import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CoreModule } from 'core/core.module';
import { SharedModule } from 'shared/shared.module';

import { PageHeaderComponent } from './page-header.component';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule.forRoot(), SharedModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PageHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('page header component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('page header component should be able to update header height on host resize', () => {
    spyOn(component.appStore, 'setHeaderHeight');
    component.onResize();
    expect(component.appStore.setHeaderHeight).toHaveBeenCalled();
  });

  it('page header component should be able to handle if header element ref is not found when updating header height on host resize', () => {
    spyOn(component.appStore, 'setHeaderHeight');
    component.header = null;
    component.onResize();
    expect(component.appStore.setHeaderHeight).not.toHaveBeenCalled();
  });

  it('page header component should be able to update currency', () => {
    spyOn(component.appStore, 'setCurrency');
    component.selectCurrency('USD');
    expect(component.appStore.setCurrency).toHaveBeenCalled();
  });
});
