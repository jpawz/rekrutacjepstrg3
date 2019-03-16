import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../model/book';
import { Checkout } from '../../model/checkout';
import { LibraryService } from '../../service/library.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book = new Book(0, '', '', '');
  checkouts = new Array<Checkout>();
  latestCheckout: Checkout;
  canBeBorrowed: boolean;
  canBeReturned: boolean;

  constructor(
    private route: ActivatedRoute,
    private service: LibraryService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getBook();
    this.service.getCheckouts(this.book.id, 0).subscribe(
      (result: any) => {
        this.setLatestCheckout(result);
        this.setCheckouts(result);
        this.setBorrowReturnValues();
      }
    );
  }

  private setCheckouts(result: any) {
    this.checkouts = result.content;
  }

  private setLatestCheckout(result: any) {
    if (result.content.length == 0) {
      this.latestCheckout = new Checkout(null, this.book.id, null, null);
    } else {
      this.latestCheckout = result.content[0];
    }
  }

  private setBorrowReturnValues() {
    if (this.latestCheckout.checkoutDate && this.latestCheckout.returnDate) {
      this.canBeBorrowed = true;
      this.canBeReturned = false;
    } else if (this.latestCheckout.checkoutDate && !this.latestCheckout.returnDate) {
      this.canBeBorrowed = false;
      this.canBeReturned = true;
    } else if (this.latestCheckout.checkoutDate) {
      this.canBeBorrowed = true;
      this.canBeReturned = true;
    } else {
      this.canBeBorrowed = true;
      this.canBeReturned = false;
    }
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getBook(id).subscribe(book => {
      this.book = book;
    });
  }

  getCheckouts(bookId: number, page: number): void {
    this.service.getCheckouts(bookId, page).subscribe((result: any) => {
      this.checkouts = result.content;
    });
  }

  deleteBook(): void {
    this.service.deleteBook(this.book.id).subscribe(() => this.location.back());
  }

  borrowBook(): void {
    this.service.borrowBook(this.book.id).subscribe(checkout => {
      this.latestCheckout = checkout;
      this.canBeBorrowed = false;
      this.canBeReturned = true;
    });
  }

  returnBook(): void {
    this.service.returnBook(this.latestCheckout).subscribe(checkout => {
      this.latestCheckout = checkout;
      this.canBeBorrowed = true;
      this.canBeReturned = false;
    });
  }
}
