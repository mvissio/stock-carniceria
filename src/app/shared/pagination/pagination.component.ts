import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Page } from '../../models/page.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() page: Page;
  @Input() pages: number[];
  @Output() pageNumber = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {
    console.log(this.pages);
  }

  sendPage(i: number, event: any) {
    event.preventDefault();
    this.pageNumber.emit(i);
  }

}
