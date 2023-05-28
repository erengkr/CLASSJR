import { TestBed } from '@angular/core/testing';

import { VeliservicesService } from './veliservices.service';

describe('VeliservicesService', () => {
  let service: VeliservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeliservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
