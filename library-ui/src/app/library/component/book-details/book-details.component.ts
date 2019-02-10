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
  checkout: Checkout;
  canBeBorrowed: boolean;
  canBeReturned: boolean;

  constructor(
    private route: ActivatedRoute,
    private service: LibraryService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getBook();
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getBook(id).subscribe(book => {
      this.book = book;
      this.getCheckout(book.id);
    });
  }

  getCheckout(bookId: number): void {
    this.service.getCheckout(bookId).subscribe(checkout => {
      this.checkout = checkout;
      this.canBeBorrowed =
        checkout == null || checkout.returnDate != null ? true : false;
      this.canBeReturned =
        checkout != null && checkout.returnDate == null ? true : false;
    });
  }

  deleteBook(): void {
    this.service.deleteBook(this.book.id).subscribe(() => this.location.back());
  }

  borrowBook(): void {
    this.service.borrowBook(this.book.id).subscribe(checkout => {
      this.checkout = checkout;
      this.canBeBorrowed = false;
      this.canBeReturned = true;
    });
  }

  returnBook(): void {
    this.service.returnBook(this.checkout).subscribe(checkout => {
      this.checkout = checkout;
      this.canBeBorrowed = true;
      this.canBeReturned = false;
    });
  }
}
