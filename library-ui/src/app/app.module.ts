import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './library/component/book-details/book-details.component';
import { BooksListComponent } from './library/component/books-list/books-list.component';
import { EditBookComponent } from './library/component/edit-book/edit-book.component';
import { LibraryComponent } from './library/library.component';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    BookDetailsComponent,
    EditBookComponent,
    BooksListComponent
  ],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
