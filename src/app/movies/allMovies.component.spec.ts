/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AllMovies } from './allMovies.component';

describe('MovieDetailsComponent', () => {
  let component: AllMovies;
  let fixture: ComponentFixture<AllMovies>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMovies ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMovies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
