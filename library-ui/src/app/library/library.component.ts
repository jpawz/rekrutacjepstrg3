import { Component, OnInit } from '@angular/core';
import { LibraryService } from './service/library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  constructor(service: LibraryService) {}

  ngOnInit() {}

  search(keyword: string): void {}
}
