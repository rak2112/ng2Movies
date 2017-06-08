/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UtilService } from './util.service';

let dateFinder = (d) => {
  let dd = d.getDate();
  let mm = d.getMonth()+ 1;
  let yy = d.getFullYear();
  let fromDate = yy + '-' + mm + '-' + dd;
  let lastDay = dd-1;
  lastDay = (lastDay) ? lastDay : lastDay+1;
  let toDate = yy + '-' + (mm-1) + '-' + lastDay;
  return {fromDate, toDate};
}
describe('Service: UtilService', () => {
  let utilSvc;
  beforeEach(() => {
    // TestBed.configureTestingModule({
    //   providers: [UtilService]
    // });
    utilSvc = new UtilService();
  });

  it('should return toFrom dates', () => {
    expect(utilSvc.toFromDates(new Date())).toEqual(dateFinder(new Date()));
  });

  it('should return genres when getMovieGenres gets called', () => {
    let movieGenre = ['Action', 'Adventure', 'Comedy'],
        genres=[{id: 'Action', name: 'Action'}],
        selectedGenres = [];
    expect(utilSvc.getMovieGenres()).toEqual([]);
  });

  it('should return genres when getMovieGenres gets called with no selectedGenres', () => {
    let movieGenre = ['Action', 'Adventure', 'Comedy'],
        genres=[{id: 'Action', name: 'Action'}],
        selectedGenres = [];
    expect(utilSvc.getMovieGenres(movieGenre, genres, selectedGenres)).toEqual([{id: 'Action', name: 'Action'}]);
  });

  it('should return genres when getMovieGenres gets called with selectedGenres', () => {
    let movieGenre = ['Action', 'Adventure', 'Comedy'],
        genres=[{id: 'Action', name: 'Action'}],
        selectedGenres = [{id: 'Action', name: 'Action'}];
    expect(utilSvc.getMovieGenres(movieGenre, genres, selectedGenres)).toEqual([{id: 'Action', name: 'Action', selected: true}]);
  });
});
