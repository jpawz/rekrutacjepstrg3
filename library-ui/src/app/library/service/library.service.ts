import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../model/book';
import { Checkout } from '../model/checkout';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private libraryUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    const url = `${this.libraryUrl}book/all`;
    return this.http.get<Book[]>(url);
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.libraryUrl}book/${id}`;
    return this.http.get<Book>(url);
  }

  saveBook(book: Book): Observable<Book> {
    const url = `${this.libraryUrl}book/add`;
    return this.http.post<Book>(url, book, httpOptions);
  }

  updateBook(book: Book): Observable<Book> {
    const url = `${this.libraryUrl}book/${book.id}`;
    return this.http.put<Book>(url, book, httpOptions);
  }

  deleteBook(id: number): Observable<Book> {
    const url = `${this.libraryUrl}book/${id}`;
    return this.http.delete<Book>(url);
  }

  getCheckout(bookId: number): Observable<Checkout> {
    const url = `${this.libraryUrl}checkout/${bookId}`;
    return this.http.get<Checkout>(url);
  }

  borrowBook(bookId: number): Observable<Checkout> {
    const url = `${this.libraryUrl}borrow/${bookId}`;
    return this.http.post<Checkout>(url, undefined, httpOptions);
  }

  returnBook(checkout: Checkout): Observable<Checkout> {
    const url = `${this.libraryUrl}return`;
    return this.http.put<Checkout>(url, checkout, httpOptions);
  }
}
