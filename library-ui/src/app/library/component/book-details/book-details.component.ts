import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../model/book';
import { LibraryService } from '../../service/library.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book = new Book(0, '', '', '');

  constructor(private route: ActivatedRoute, private service: LibraryService, private location: Location) {}

  ngOnInit() {
    this.getBook();
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getBook(id).subscribe(book => (this.book = book));
  }

  deleteBook(): void {
    this.service.deleteBook(this.book.id).subscribe(() => this.location.back());
  }
}
