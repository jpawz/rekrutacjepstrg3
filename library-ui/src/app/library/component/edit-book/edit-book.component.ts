import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../model/book';
import { LibraryService } from '../../service/library.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  book = new Book(0, '', '', '');

  constructor(private route: ActivatedRoute, private service: LibraryService) {}

  ngOnInit() {
    this.getBook();
  }

  getBook(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
      this.book = new Book(0, '', '', '');
    } else {
      this.service.getBook(+id).subscribe(book => (this.book = book));
    }
  }

  onSubmit() {
    this.service.saveBook(this.book).subscribe();
    this.book = new Book(0, '', '', '');
  }
}
