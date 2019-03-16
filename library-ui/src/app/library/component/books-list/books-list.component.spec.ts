import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListComponent } from './books-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { LibraryService } from '../../service/library.service';
import { Book } from '../../model/book';
import { of } from 'rxjs';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;
  let libraryService: LibraryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BooksListComponent],
      imports: [RouterTestingModule, HttpClientModule]
    })
      .compileComponents();

    libraryService = TestBed.get(LibraryService);
    spyOn(libraryService, 'getBooks').and.returnValue(of(
      [new Book(0, 'Title', 'Author', 'Descr'),
      new Book(1, 'Title2', 'Author', 'Descr')]));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render list of books', () => {
    expect(component.books.length).toEqual(2);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.queurySelector('#bookList').length).toEqual(2);
    });
  });
});
