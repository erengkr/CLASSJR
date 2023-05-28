import { TestBed } from '@angular/core/testing';

import { TeachertokenInterceptor } from './teachertoken.interceptor';

describe('TeachertokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TeachertokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TeachertokenInterceptor = TestBed.inject(TeachertokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
