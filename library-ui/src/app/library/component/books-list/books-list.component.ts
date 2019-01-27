import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/book';
import { LibraryService } from '../../service/library.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  private books: Book[] = [];

  constructor(service: LibraryService) {
    this.books = service.getBooks();
  }

  ngOnInit() {}
}
