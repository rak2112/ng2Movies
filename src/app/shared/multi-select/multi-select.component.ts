import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'multi-select-cmp',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent {
  selectedItems: Array<string> = [];

  @Input() public label: string;
  @Input() public selectedFilter:{};
  @Input() public items: Array<{}>;
  @Input() public isMultiSelect: boolean;
  @Input() public multiSelectItems: Array<{}>;

  @Output() onFilterChange: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() onSelectionRemove: EventEmitter<[{}]> = new EventEmitter<[{}]>();

  onSelection(item) {
    this.onFilterChange.emit(item);
  }

  onRemove(item, index) {
    item.index = index;
    this.onSelectionRemove.emit(item);
  }
}
