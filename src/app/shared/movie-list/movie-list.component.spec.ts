import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MovieListComponent } from './movie-list.component';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let rendrer;

  beforeEach(() => {
    component = new MovieListComponent(rendrer);
  });

  it('should emit when onEditFavList gets called', () => {
    spyOn(component.onEditlist, 'emit');
    component.onEditFavList(':data')
    expect(component.onEditlist.emit).toHaveBeenCalledWith(':data');
  });
});
