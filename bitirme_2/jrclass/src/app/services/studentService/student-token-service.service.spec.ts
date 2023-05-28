import { TestBed } from '@angular/core/testing';

import { StudentTokenServiceService } from './student-token-service.service';

describe('StudentTokenServiceService', () => {
  let service: StudentTokenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentTokenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
