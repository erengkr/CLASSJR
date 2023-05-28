import { TestBed } from '@angular/core/testing';

import { LessonNoteService } from './lesson-note.service';

describe('LessonNoteService', () => {
  let service: LessonNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
