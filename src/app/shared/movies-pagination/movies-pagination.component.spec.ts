/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MoviesPaginationComponent } from './movies-pagination.component';

describe('MoviesPaginationComponent', () => {
  let component: MoviesPaginationComponent;
  let fixture: ComponentFixture<MoviesPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesPaginationComponent ],
      imports: [NgbModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    this.fixture = TestBed.createComponent(MoviesPaginationComponent);
    component = this.fixture.componentInstance;
    this.fixture.detectChanges();
  });

  it(`should create 2 pages and 4 (navigation controls) when collectionSize is 30`, () => {
    component.collectionSize = 30;
    component.pageNo = 1;
    const elem = this.fixture.nativeElement;
    this.fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(elem.querySelectorAll('li').length).toBe(6);
  });

  it(`should emit event when onPageChange gets called on page 2`, () => {
    spyOn(component.selectedPage, 'emit');
    component.onPageChange(2);
    expect(component.selectedPage.emit).toHaveBeenCalledWith(2);
  });
});
