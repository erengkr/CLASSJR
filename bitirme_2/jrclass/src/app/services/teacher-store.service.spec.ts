import { TestBed } from '@angular/core/testing';

import { TeacherStoreService } from './teacher-store.service';

describe('TeacherStoreService', () => {
  let service: TeacherStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
