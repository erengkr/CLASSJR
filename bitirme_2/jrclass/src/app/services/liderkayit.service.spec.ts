import { TestBed } from '@angular/core/testing';

import { LiderkayitService } from './liderkayit.service';

describe('LiderkayitService', () => {
  let service: LiderkayitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiderkayitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
