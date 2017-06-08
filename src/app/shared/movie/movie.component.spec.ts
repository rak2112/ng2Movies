/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilService } from './../services/util.service';
import { By } from '@angular/platform-browser';
import { DebugElement} from '@angular/core';

import { MovieComponent } from './movie.component';


describe('MovieComponent', () => {
  let component: MovieComponent, mockUtilService;

  beforeEach(async(() => {
    mockUtilService = jasmine.createSpyObj('mockAuthSvc', ['getMovieGenres', 'logOut']);
    component = new MovieComponent(mockUtilService);
  }));

  it('should get movieGenres without a user logged in', () => {
    mockUtilService.getMovieGenres.and.returnValue([1,2]);
    component.userMovies = {userId: null};
    component.ngOnInit();
    expect(component.movieGenres.length).toBe(2);
    expect(component.isFav).toBe(false);
    expect(component.isWatchList).toBe(false);
  });
  //:TODO undefined is not a constructor
  xit('should get movieGenres with a user logged in and mark it as fav and inWatchList', () => {
    mockUtilService.getMovieGenres.and.returnValue([1]);
    component.userMovies = {userId: ':id', favIds:[':XYZ'], watchIds:[':XYZ']};
    component.movieData = {id: ':XYZ'}
    component.ngOnInit();
    expect(component.movieGenres.length).toBe(2);
    expect(component.isFav).toBe(false);
    expect(component.isWatchList).toBe(false);
  });

  it('should emit when onMarkAsFav gets called', () => {
    spyOn(component.editFavList, 'emit');
    component.userMovies = {userId: ':userId'};
    component.onMarkAsFav(new Event('click'), {favorite: null});
    expect(component.isFav).toBe(true);
    expect(component.editFavList.emit).toHaveBeenCalledWith({favorite: true});
  });

  it('should emit when onAddToList gets called', () => {
    spyOn(component.editFavList, 'emit');
    component.userMovies = {userId: ':userId'};
    component.onAddToList(new Event('click'), {});
    expect(component.isWatchList).toBe(true);
    expect(component.editFavList.emit).toHaveBeenCalledWith({includeInWatch: true, watchList: true});
  });
});
