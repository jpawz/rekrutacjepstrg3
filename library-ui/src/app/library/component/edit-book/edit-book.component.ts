import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
        this.bookForm.setValue(book);
      });
    }
  }

  onSubmit() {
    if (this.bookForm.value.id === -1) {
      this.service.saveBook(this.bookForm.value).subscribe(book => {
        this.bookForm.setValue(book);
      });
    } else {
      this.service.updateBook(this.bookForm.value).subscribe(book => {
        this.bookForm.setValue(book);
      });
    }
  }
}
