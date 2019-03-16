import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/book';
import { LibraryService } from '../../service/library.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: Book[] = [];

  constructor(private service: LibraryService) {
  }

  ngOnInit() {
    this.service.getBooks().subscribe(books => (this.books = books));
  }
}
