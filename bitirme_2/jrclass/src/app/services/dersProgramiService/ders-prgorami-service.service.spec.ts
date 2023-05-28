import { TestBed } from '@angular/core/testing';

import { DersPrgoramiServiceService } from './ders-prgorami-service.service';

describe('DersPrgoramiServiceService', () => {
  let service: DersPrgoramiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DersPrgoramiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
