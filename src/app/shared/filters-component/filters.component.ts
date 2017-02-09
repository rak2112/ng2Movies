import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-filters-cmp',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FilterComponent {
  @Input() public filters: {};
  @Input() public selectedFilters:{};
  @Output() onFilterChange: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() onRemoveSelection: EventEmitter<[{}]> = new EventEmitter<[{}]>();

  onFilterSelection(item) {
    this.onFilterChange.emit(item);
  }

  onItemRemove(item) { console.log('filter removing')
    this.onRemoveSelection.emit(item);
  }
}
