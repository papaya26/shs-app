import { TestBed } from '@angular/core/testing';

import { AppStore } from './app.store';

describe('AppStore', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppStore = TestBed.get(AppStore);
    expect(service).toBeTruthy();
  });
});
