import { TestBed } from '@angular/core/testing';

import { LiderServiceService } from './lider-service.service';

describe('LiderServiceService', () => {
  let service: LiderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
