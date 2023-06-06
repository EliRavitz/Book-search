import { TestBed } from '@angular/core/testing';

import { BookUpdateService } from './book-update.service';

describe('BookUpdateService', () => {
  let service: BookUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
