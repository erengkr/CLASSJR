import { TestBed } from '@angular/core/testing';

import { LeaderStoreService } from './leader-store.service';

describe('LeaderStoreService', () => {
  let service: LeaderStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaderStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
