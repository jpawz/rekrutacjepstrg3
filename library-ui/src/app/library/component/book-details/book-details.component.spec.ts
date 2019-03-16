import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LibraryService } from '../../service/library.service';
import { BookDetailsComponent } from './book-details.component';
import { Book } from '../../model/book';


const neverBorrowedJson = {
  content: []
};

const borrowedOneTimeButNotReturnedJson = {
  content: [
    {
      id: 1,
      bookId: 0,
      checkoutDate: "2019-02-17T12:15:03.328",
      returnDate: null
    }
  ]
};


const borrowedManyTimesButNotReturnedJson = {
  content: [
    {
      id: 3,
      bookId: 0,
      checkoutDate: "2019-02-17T12:15:03.328",
      returnDate: null
    },
    {
      id: 2,
      bookId: 0,
      checkoutDate: "2019-01-17T12:15:03.328",
      returnDate: "2019-01-18T12:15:03.328"
    },
    {
      id: 1,
      bookId: 0,
      checkoutDate: "2019-01-01T12:15:03.328",
      returnDate: "2019-01-02T12:15:03.328"
    }
  ]
};

const borrowedOneTimeAndReturnedJson = {
  content: [
    {
      id: 1,
      bookId: 0,
      checkoutDate: "2019-02-17T12:15:03.328",
      returnDate: "2019-02-19T12:15:03.328"
    }
  ]
};

const borrowedManyTimesAndReturnedJson = {
  content: [
    {
      id: 3,
      bookId: 0,
      checkoutDate: "2019-02-19T12:15:03.328",
      returnDate: "2019-02-21T12:15:03.328"
    },
    {
      id: 2,
      bookId: 0,
      checkoutDate: "2019-01-17T12:15:03.328",
      returnDate: "2019-01-18T12:15:03.328"
    },
    {
      id: 1,
      bookId: 0,
      checkoutDate: "2019-01-01T12:15:03.328",
      returnDate: "2019-01-02T12:15:03.328"
    }
  ]
};

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let libraryService: LibraryService;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let compiled: any;
  let getCheckoutsSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '0' })
            }
          }
        }
      ],
      imports: [RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
    component = TestBed.createComponent(BookDetailsComponent).componentInstance;
    libraryService = TestBed.get(LibraryService);
    spyOn(libraryService, 'getBook').and.returnValue(of(new Book(0, 'book title', 'author of the book', 'descr')));
    getCheckoutsSpy = spyOn(libraryService, 'getCheckouts').and.returnValue(of(neverBorrowedJson));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('never borowed book can be borrowed', () => {
    getCheckoutsSpy.and.returnValue(of(neverBorrowedJson));
    component.ngOnInit();
    expect(component.canBeBorrowed).toBeTruthy();
    expect(component.canBeReturned).toBeFalsy();
  });

  it('not returned book cannot be borrowed', () => {
    getCheckoutsSpy.and.returnValue(of(borrowedOneTimeButNotReturnedJson));
    component.ngOnInit();
    expect(component.canBeBorrowed).toBeFalsy();
    expect(component.canBeReturned).toBeTruthy();
  });

  it('not returned book (but borrowed and returned many times) cannot be borrowed', () => {
    getCheckoutsSpy.and.returnValue(of(borrowedManyTimesButNotReturnedJson));
    component.ngOnInit();
    expect(component.canBeBorrowed).toBeFalsy();
    expect(component.canBeReturned).toBeTruthy();
  });

  it('borrowed one time but returned book can be borrowed', () => {
    getCheckoutsSpy.and.returnValue(of(borrowedOneTimeAndReturnedJson));
    component.ngOnInit();
    expect(component.canBeBorrowed).toBeTruthy();
    expect(component.canBeReturned).toBeFalsy();
  });

  it('borrowed many times and returned book can be borrowed', () => {
    getCheckoutsSpy.and.returnValue(of(borrowedManyTimesAndReturnedJson));
    component.ngOnInit();
    expect(component.canBeBorrowed).toBeTruthy();
    expect(component.canBeReturned).toBeFalsy();
  });

  it('should render book title, author and description', async(() => {
    expect(compiled.querySelector('#bookTitle').textContent).toContain('book title');
    expect(compiled.querySelector('#bookAuthor').textContent).toContain('author of the book');
    expect(compiled.querySelector('#bookDescription').textContent).toContain('descr');
  }));

  it('should render list of recent checkouts', async(() => {
    getCheckoutsSpy.and.returnValue(of(borrowedManyTimesAndReturnedJson));
    component.ngOnInit();
    expect(component.checkouts.length).toEqual(3);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(compiled.querySelector('#checkouts').children.length).toEqual(3);
    });
  }));
});
