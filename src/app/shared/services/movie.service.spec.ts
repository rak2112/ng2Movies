/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovieService } from './movie.service';
import { Observable } from 'rxjs/Rx';

describe('Service: Movie', () => {
  let movieService, mockHttp, mockUtilSvc, mockStore;
  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['get', 'post']);
    mockStore = jasmine.createSpyObj('mockStore', ['select', 'post']);
    movieService = new MovieService(mockHttp, mockUtilSvc, mockStore);
    // TestBed.configureTestingModule({
    //   providers: [MovieService]
    // });
  });

  it('should ...', inject([MovieService], (service: MovieService) => {
    expect(service).toBeTruthy();
  }));
});
