import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './library/component/book-details/book-details.component';
import { BooksListComponent } from './library/component/books-list/books-list.component';
import { EditBookComponent } from './library/component/edit-book/edit-book.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: BooksListComponent },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'edit/:id', component: EditBookComponent },
  { path: 'add', component: EditBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
