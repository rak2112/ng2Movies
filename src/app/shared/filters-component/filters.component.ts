import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { IFilters, ISelectedFilters } from './../dataModels/index';
@Component({
  selector: 'app-filters-cmp',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FilterComponent {
  @Input() public filters: IFilters;
  @Input() public selectedFilters: ISelectedFilters;
  @Output() onFilterChange: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() onRemoveSelection: EventEmitter<[{}]> = new EventEmitter<[{}]>();

  onFilterSelection(item: {}) {
    this.onFilterChange.emit(item);
  }

  onItemRemove(item: [{}]) {
    this.onRemoveSelection.emit(item);
  }
}
