import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private books = new Array();

  constructor(private http: HttpClient) {}

  getBooks(): Book[] {
    return this.books;
  }

  getBook(id: number): Book {
    return this.books.find(x => x.id === id);
  }

  saveBook(book: Book): void {
    this.books.push(book);
  }
}
