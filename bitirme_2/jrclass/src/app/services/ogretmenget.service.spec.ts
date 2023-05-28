import { TestBed } from '@angular/core/testing';

import { OgretmengetService } from './ogretmenget.service';

describe('OgretmengetService', () => {
  let service: OgretmengetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OgretmengetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
