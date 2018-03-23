import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { IFilters, ISelectedFilters } from '../../core/models/';
@Component({
  selector: 'app-filters-cmp',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FilterComponent { 
	// constructor(){console.log('filtersss', this.filters);}
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
