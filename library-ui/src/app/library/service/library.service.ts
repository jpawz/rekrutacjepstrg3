import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../model/book';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private bookUrl = 'http://localhost:8080/api/book/';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    const url = `${this.bookUrl}all`;
    return this.http.get<Book[]>(url);
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.bookUrl}${id}`;
    return this.http.get<Book>(url);
  }

  saveBook(book: Book): Observable<Book> {
    const url = `${this.bookUrl}add`;
    return this.http.post<Book>(url, book, httpOptions);
  }
}
