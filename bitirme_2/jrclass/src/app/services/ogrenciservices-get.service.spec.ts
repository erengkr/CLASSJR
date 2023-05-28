import { TestBed } from '@angular/core/testing';

import { OgrenciservicesGetService } from './ogrenciservices-get.service';

describe('OgrenciservicesGetService', () => {
  let service: OgrenciservicesGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OgrenciservicesGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
