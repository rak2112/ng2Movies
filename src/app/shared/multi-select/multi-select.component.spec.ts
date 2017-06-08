/* tslint:disable:no-unused-variable */
//import { describe } from '@types/jasmine';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MultiSelectComponent } from './multi-select.component';

describe('MovieListComponent', () => {
  let component: MultiSelectComponent;

  beforeEach(() => {
    component = new MultiSelectComponent();
  });

  it('should emit when onSelection gets called', () => {
    spyOn(component.onFilterChange, 'emit');
    component.onSelection(':data')
    expect(component.onFilterChange.emit).toHaveBeenCalledWith(':data');
  });

  it('should emit when onSelection gets called', () => {
    spyOn(component.onSelectionRemove, 'emit');
    component.onRemove({index: ':data'}, ':index');
    expect(component.onSelectionRemove.emit).toHaveBeenCalledWith({index: ':index'});
  });
});
