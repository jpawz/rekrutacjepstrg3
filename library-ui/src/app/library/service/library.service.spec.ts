import { TestBed } from '@angular/core/testing';

import { LibraryService } from './library.service';
import { HttpClientModule } from '@angular/common/http';

describe('BookService', () => {
  let libraryService: LibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibraryService],
      imports: [HttpClientModule]
    });

    libraryService = TestBed.get(LibraryService);
  });

  it('should be created', () => {
    expect(libraryService).toBeTruthy();
  });
});
