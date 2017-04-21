import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-movies-pagination',
  templateUrl: './movies-pagination.component.html',
  styleUrls: ['./movies-pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MoviesPaginationComponent {
  //page: number;
  @Input() public pageNo: number;
  @Input() public collectionSize: number;
  @Output() selectedPage: EventEmitter<number> = new EventEmitter<number>();


  onPageChange(currentPage: number) {
    this.selectedPage.emit(currentPage);
  }
}
