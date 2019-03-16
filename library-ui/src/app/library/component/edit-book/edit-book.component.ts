import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../model/book';
import { LibraryService } from '../../service/library.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookForm = this.fb.group({
    id: [-1],
    title: ['', Validators.required],
    author: ['', Validators.required],
    description: ['']
  });


  constructor(private route: ActivatedRoute, private service: LibraryService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getBook();
  }

  getBook(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.service.getBook(+id).subscribe(book => {
        const b: Book = Object.assign({}, this.bookForm.value);
        b.id = book.id;
        b.title = book.title;
        b.author = book.author;
        b.description = book.description;
      });
    }
  }

  onSubmit() {
    if (this.bookForm.value.book.id === -1) {
      this.service.saveBook(this.bookForm.value).subscribe(book => {
        const b: Book = Object.assign({}, this.bookForm.value);
        b.id = book.id;
        b.title = book.title;
        b.author = book.author;
        b.description = book.description;
      });
    } else {
      this.service.updateBook(this.bookForm.value).subscribe(book => {
        const b: Book = Object.assign({}, this.bookForm.value);
        b.id = book.id;
        b.title = book.title;
        b.author = book.author;
        b.description = book.description;
      });
    }
  }
}
