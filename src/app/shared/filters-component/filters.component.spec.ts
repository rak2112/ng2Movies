/* tslint:disable:no-unused-variable */
//import { describe } from '@types/jasmine';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FilterComponent } from './filters.component';

describe('MovieListComponent', () => {
  let component: FilterComponent;

  beforeEach(() => {
    component = new FilterComponent();
  });

  it('should emit when onFilterSelection gets called', () => {
    spyOn(component.onFilterChange, 'emit');
    component.onFilterSelection(':data')
    expect(component.onFilterChange.emit).toHaveBeenCalledWith(':data');
  });

  it('should emit when onItemRemove gets called', () => {
    spyOn(component.onRemoveSelection, 'emit');
    component.onItemRemove([':data'])
    expect(component.onRemoveSelection.emit).toHaveBeenCalledWith([':data']);
  });
});
