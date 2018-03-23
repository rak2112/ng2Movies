/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, tick, fakeAsync } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection} from '@angular/http/testing';
import {configTestBed, movieServiceDefaultState, getUrls, ResponseError} from './service.config.spec';
import { MovieService } from './movie.service';
import { Observable } from 'rxjs/Rx';
import { paths } from './locationPaths';
import 'rxjs/add/operator/map';

describe('Service: Movie', () => {
  let movieService, mockHttp, mockUtilSvc, mockStore, paths, mockBackend;
  beforeEach(() => {
  configTestBed(MovieService);
 });

 beforeEach(inject([ MockBackend, Http ],
   (mb: MockBackend, http: Http) => {
     mockStore = jasmine.createSpyObj('mockStore', ['select', 'dispatch']);
     mockUtilSvc = jasmine.createSpyObj('mockUtilSvc', ['toFromDates']);
     mockUtilSvc.toFromDates.and.returnValue({fromDate: '05-04-2017', toDate: '05-05-2017'});
     mockStore.select.and.returnValue(Observable.of(movieServiceDefaultState()));
     mockBackend = mb;
     movieService = new MovieService(http, mockUtilSvc, mockStore);
 }));

  describe('getMovies', ()=>{
    it(`should call getAllMovies if route is 'movies' `, () => {
      spyOn(movieService, 'getAllMovies');
      movieService.getMovies(1, 'movies');
      expect(movieService.getAllMovies).toHaveBeenCalledWith(1);
    });

    it(`should call getPopularMovies if route is 'popular' `, () => {
      spyOn(movieService, 'getPopularMovies');
      movieService.getMovies(3, 'popular');
      expect(movieService.getPopularMovies).toHaveBeenCalledWith(3);
    });

    it(`should call getUpComingMovies if route is 'upComing' `, () => {
      spyOn(movieService, 'getUpComingMovies');
      movieService.getMovies(6, 'upComing');
      expect(movieService.getUpComingMovies).toHaveBeenCalledWith(6);
    });

    it(`should call getLatestMovies if route is 'latest' `, () => {
      spyOn(movieService, 'getLatestMovies');
      movieService.getMovies(4, 'latest');
      expect(movieService.getLatestMovies).toHaveBeenCalledWith(4);
    });

    it(`should call getInCinemas if route is 'inCinemas' `, () => {
      spyOn(movieService, 'getInCinemas');
      movieService.getMovies(5, 'inCinemas');
      expect(movieService.getInCinemas).toHaveBeenCalledWith(5);
    });

    it(`should call getAllMovies if route is not in the list `, () => {
      spyOn(movieService, 'getAllMovies');
      movieService.getMovies(1);
      expect(movieService.getAllMovies).toHaveBeenCalledWith(1);
    });
  });

  describe('helperFns', ()=> {
    it(`should return correct url fragment for year if there is one`, () => {
      expect(movieService.getUrlYear({id: 2017})).toBe('&primary_release_year=2017');
    });
    it(`should return an empty string if no years selected`, () => {
      expect(movieService.getUrlYear({id: null})).toBe('');
    });
    it(`should return an empty string if no sorting is selected`, () => {
      expect(movieService.getUrlOrder({id: null})).toBe('');
    });
    it(`should return a correct Url fragment if sorting is not selected`, () => {
      expect(movieService.getUrlOrder({id: 'sortByAsc'})).toBe('&sort_by=sortByAsc');
    });
    it(`should return an empty string if generes is not selected`, () => {
      expect(movieService.getUrlGenres([])).toBe('');
    });
    it(`should return a correct url fragement if generes is selected`, () => {
      expect(movieService.getUrlGenres([{id:'Action'}, {id: 'Adventure'}])).toBe('&with_genres=Action&with_genres=Adventure');
    });
    it(`should dispatch correct action, when dispatchFilters gets called with years(filter)`, () => {
      let action = {type: 'FILTER_CHANGED_YEARS', payload: {type: 'years'}}
      movieService.dispatchFilters({type:'years'}, 'movies', 2);
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });
    it(`should dispatch correct action, when dispatchFilters gets called with otherFilters(filter)`, () => {
      let action = {type: 'FILTER_CHANGED_OTHERS', payload: {type: 'otherFilters'}}
      movieService.dispatchFilters({type:'otherFilters'}, 'movies', 2);
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });
    it(`should dispatch correct action, when dispatchFilters gets called with remove_genres(filter)`, () => {
      let action = {type: 'FILTER_REMOVE_MULTI', payload: {type: 'remove_genres'}}
      movieService.dispatchFilters({type:'remove_genres'}, 'movies', 2);
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });
    it(`should dispatch correct action, when dispatchFilters gets called with default(filter)`, () => {
      let action = {type: 'FILTER_ADD_MULTI', payload: {type: 'any'}}
      movieService.dispatchFilters({type: 'any'});
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe(`searchMovies`, () => {
    it('instance should be injected...', async() => {
      expect(movieService).toBeTruthy();
    });

    it(`should call the get method and dispatch an action`, async() => {
      let action = {
        type: 'TRIGGER_SEARCH',
        payload: {movie: ':movieName', movies: [{name: ':movieName', media_type: 'movie'}]}
      };
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.url)
          .toEqual('https://api.themoviedb.org/3/search/multi?api_key=60773f18ef6a7a9ee3d4a640fab964eb&language=en-US&query=:movieName');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {results: [{name: ':movieName', media_type: 'movie'}]}
        })));
      });
      movieService.searchMovies(':movieName');
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe(`getAllMovies`, () => {
    it(`should call the get method and dispatch an action`, async() => {
      let pageNo = 3;
      let action = { type: 'LOAD_SUCCESS', payload: [{results:[], total_results:0}, {genres: ['action', 'comedy']}] };
      let [url, nxtUrl] = getUrls(...[pageNo, 'allMovies', 'genres']);
      let requestedConnections = [];
      let responses = {};
      responses[url] = new Response(new ResponseOptions({body: {results:[], total_results:0} }));
      responses[nxtUrl] = new Response(new ResponseOptions({body: {genres: ['action', 'comedy']} }));

      mockBackend.connections.subscribe((connection: MockConnection) => {
        requestedConnections.push(connection);
        connection.mockRespond(responses[connection.request.url]);
      });
      movieService.getAllMovies(pageNo);
      expect(requestedConnections[0].request.url)
        .toEqual(url);
      expect(requestedConnections[1].request.url)
          .toEqual(nxtUrl);
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });


    it(`OnError, should call the get method and dispatch an action with an error`, () => {
      let err = new ResponseError();
      err.status = 404;
      err.statusText = 'something wrong';

      let action = { type: 'LOAD_ERROR', payload: err};
      mockBackend.connections.subscribe((connection: MockConnection) => {
        //requestedConnections.push(connection);

        connection.mockError(err);
      });
      movieService.getAllMovies(2);
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe(`getPopularMovies`, () => {
    it(`should call the get method and dispatch an action`, async() => {
      let pageNo = 4;
      let action = { type: 'LOAD_SUCCESS', payload: [{results:[], total_results:0}, {genres: ['action', 'comedy']}] };
      let [url, nxtUrl] = getUrls(...[pageNo, 'popularMovies', 'genres']);
      let requestedConnections = [];
      let responses = {};
      responses[url] = new Response(new ResponseOptions({body: {results:[], total_results:0} }));
      responses[nxtUrl] = new Response(new ResponseOptions({body: {genres: ['action', 'comedy']} }));

      mockBackend.connections.subscribe((connection: MockConnection) => {
        requestedConnections.push(connection);
        connection.mockRespond(responses[connection.request.url]);
      });
      movieService.getPopularMovies(pageNo);
      expect(requestedConnections[0].request.url)
        .toEqual(url);
      expect(requestedConnections[1].request.url)
          .toEqual(nxtUrl);
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });


    it(`OnError, should call the get method and dispatch an action with an error`, () => {
      let err = new ResponseError();
      err.status = 404;
      err.statusText = 'something wrong';

      let action = { type: 'LOAD_ERROR', payload: err};
      mockBackend.connections.subscribe((connection: MockConnection) => {
        //requestedConnections.push(connection);

        connection.mockError(err);
      });
      movieService.getPopularMovies(1);
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe(`getUpComingMovies`, () => {
    it(`should call the get method and dispatch an action`, async() => {
      let pageNo = 4;
      let action = { type: 'LOAD_SUCCESS', payload: [{results:[], total_results:0}, {genres: ['action', 'comedy']}] };
      let [url, nxtUrl] = getUrls(...[pageNo, 'getUpComingMovies', 'genres']);
      let requestedConnections = [];
      let responses = {};
      responses[url] = new Response(new ResponseOptions({body: {results:[], total_results:0} }));
      responses[nxtUrl] = new Response(new ResponseOptions({body: {genres: ['action', 'comedy']} }));

      mockBackend.connections.subscribe((connection: MockConnection) => {
        requestedConnections.push(connection);
        connection.mockRespond(responses[connection.request.url]);
      });
      movieService.getUpComingMovies(pageNo);
      expect(requestedConnections[0].request.url)
        .toEqual(url);
      expect(requestedConnections[1].request.url)
          .toEqual(nxtUrl);
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });


    it(`OnError, should call the get method and dispatch an action with an error`, () => {
      let err = new ResponseError();
      err.status = 404;
      err.statusText = 'something wrong';

      let action = { type: 'LOAD_ERROR', payload: err};
      mockBackend.connections.subscribe((connection: MockConnection) => {
        //requestedConnections.push(connection);

        connection.mockError(err);
      });
      movieService.getUpComingMovies(1);
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe(`getInCinemas`, () => {
    it(`should call the get method and dispatch an action`, async() => {
      let pageNo = 6;
      let action = { type: 'LOAD_SUCCESS', payload: [{results:[], total_results:0}, {genres: ['action', 'comedy']}] };
      let [url, nxtUrl] = getUrls(...[pageNo, 'getInCinemas', 'genres']);
      let requestedConnections = [];
      let responses = {};
      responses[url] = new Response(new ResponseOptions({body: {results:[], total_results:0} }));
      responses[nxtUrl] = new Response(new ResponseOptions({body: {genres: ['action', 'comedy']} }));

      mockBackend.connections.subscribe((connection: MockConnection) => {
        requestedConnections.push(connection);
        connection.mockRespond(responses[connection.request.url]);
      });
      movieService.getInCinemas(pageNo);
      expect(requestedConnections[0].request.url)
        .toEqual(url);
      expect(requestedConnections[1].request.url)
          .toEqual(nxtUrl);
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });


    it(`OnError, should call the get method and dispatch an action with an error`, () => {
      let err = new ResponseError();
      err.status = 404;
      err.statusText = 'something wrong';

      let action = { type: 'LOAD_ERROR', payload: err};
      mockBackend.connections.subscribe((connection: MockConnection) => {
        //requestedConnections.push(connection);

        connection.mockError(err);
      });
      movieService.getInCinemas(1);
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe(`getLatestMovies`, () => {
    it(`should call the get method and dispatch an action`, async() => {
      let pageNo = 6;
      let action = { type: 'LOAD_SUCCESS', payload: [{results:[], total_results:0}, {genres: ['action', 'comedy']}] };
      let [url, nxtUrl] = getUrls(...[pageNo, 'getLatestMovies', 'genres']);
      let requestedConnections = [];
      let responses = {};
      responses[url] = new Response(new ResponseOptions({body: {results:[], total_results:0} }));
      responses[nxtUrl] = new Response(new ResponseOptions({body: {genres: ['action', 'comedy']} }));

      mockBackend.connections.subscribe((connection: MockConnection) => {
        requestedConnections.push(connection);
        connection.mockRespond(responses[connection.request.url]);
      });
      movieService.getLatestMovies(pageNo);
      expect(requestedConnections[0].request.url)
        .toEqual(url);
      expect(requestedConnections[1].request.url)
          .toEqual(nxtUrl);
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });


    it(`OnError, should call the get method and dispatch an action with an error`, () => {
      let err = new ResponseError();
      err.status = 404;
      err.statusText = 'something wrong';

      let action = { type: 'LOAD_ERROR', payload: err};
      mockBackend.connections.subscribe((connection: MockConnection) => {
        //requestedConnections.push(connection);

        connection.mockError(err);
      });
      movieService.getLatestMovies(1);
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe(`getMovieDetails`, () => {
    it(`should call the get method and dispatch an action`, async() => {
      let pageNo = 6;
      let action = {
        type: 'DETAILS_LOADED',
        payload: { movieDetails:{results:[], total_results:0},
        videos: [':video1', ':video2'],
        images:['/xyz'],
        cast:[],
        crew:[]}
      };
      let [url, nxtUrl, imgUrl, castUrl] = getUrls(...[pageNo, 'movieDetail', 'videos', 'images', 'casts']);
      let requestedConnections = [];
      let responses = {};
      responses[url] = new Response(new ResponseOptions({body: {results:[], total_results:0} }));
      responses[nxtUrl] = new Response(new ResponseOptions({body: {results: [':video1', ':video2']} }));
      responses[imgUrl] = new Response(new ResponseOptions({body: {posters: [{file_path: '/xyz'}]} }));
      responses[castUrl] = new Response(new ResponseOptions({body: {cast: [], crew:[]} }));

      mockBackend.connections.subscribe((connection: MockConnection) => {
        requestedConnections.push(connection);
        connection.mockRespond(responses[connection.request.url]);
      });
      movieService.getMovieDetails(pageNo);
      expect(requestedConnections[0].request.url)
        .toEqual(url);
      expect(requestedConnections[1].request.url)
          .toEqual(nxtUrl);
      expect(requestedConnections[2].request.url)
          .toEqual(imgUrl);
      expect(requestedConnections[3].request.url)
          .toEqual(castUrl);
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });


    it(`OnError, should call the get method and dispatch an action with an error`, () => {
      let err = new ResponseError();
      err.status = 404;
      err.statusText = 'something wrong';

      let action = { type: 'ERROR_DETAILS', payload: err};
      mockBackend.connections.subscribe((connection: MockConnection) => {
        //requestedConnections.push(connection);

        connection.mockError(err);
      });
      movieService.getMovieDetails(1);
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
