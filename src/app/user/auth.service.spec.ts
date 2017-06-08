/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, tick, fakeAsync } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection} from '@angular/http/testing';
import {configTestBed, authSvcDefaults, authSvcUserHasAuth, getAuthUserUrls, ResponseError} from './../shared/services/service.config.spec';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';
import { paths } from './../shared/services/locationPaths';
import 'rxjs/add/operator/map';

describe('Service: Auth', () => {
  let authService, mockHttp, mockUiNotificationSvc, mockStore, paths, mockBackend;
  beforeEach(() => {
  configTestBed(AuthService);
 });

 beforeEach(inject([ MockBackend, Http ],
   (mb: MockBackend, http: Http) => {
     mockStore = jasmine.createSpyObj('mockStore', ['select', 'dispatch']);
     mockUiNotificationSvc = jasmine.createSpyObj('mockUiNotificationSvc', ['warning', 'success']);
     mockUiNotificationSvc.warning.and.returnValue(Observable.of(false));
     mockUiNotificationSvc.success.and.returnValue(Observable.of(false));
     mockStore.select.and.returnValue(Observable.of(authSvcDefaults()));
     mockBackend = mb;
     authService = new AuthService(http, mockStore, mockUiNotificationSvc);
 }));

 afterEach(()=>{
   localStorage.removeItem('sessionId');
 });

  describe('helper fn', ()=>{
    it(`should call hasAuth and return a boolean' `, () => {
      authService.currentUser = false;
      expect(authService.hasAuth()).toBe(false);
      authService.currentUser = true;
      expect(authService.hasAuth()).toBe(true);
    });

    it(`should call getAuthByStorage and return sessionId from localStorage' `, () => {
      localStorage.setItem('sessionId', ':sessionId');
      expect(authService.getAuthByStorage()).toBe(':sessionId');
      localStorage.removeItem('sessionId');
    });

    it(`should call logOut and dispatch correct actions' `, () => {
      authService.logOut();
      expect(mockStore.dispatch).toHaveBeenCalledWith({type: 'USER_LOGGED_OUT'});
      expect(mockStore.dispatch).toHaveBeenCalledWith({type: 'NO_USER_LOGGED'});
    });

    it(`should call generateNotification and call uiNotificationSvc with mark as fav' `, () => {
      authService.generateNotification({favorite: true});
      expect(mockUiNotificationSvc.success).toHaveBeenCalledWith('Success', 'Marked as Favorite');
    });

    it(`should call generateNotification and call uiNotificationSvc with removed from fav' `, () => {
      authService.generateNotification({favorite: false});
      expect(mockUiNotificationSvc.success).toHaveBeenCalledWith('Success', 'Removed from Favorites');
    });

    it(`should call generateNotification and call uiNotificationSvc with add in Watchlist' `, () => {
      authService.generateNotification({watchList: true, includeInWatch: true});
      expect(mockUiNotificationSvc.success).toHaveBeenCalledWith('Success', 'Added in the Watchlist');
    });

    it(`should call generateNotification and call uiNotificationSvc with removed from Watchlist' `, () => {
      authService.generateNotification({watchList: true, includeInWatch: false});
      expect(mockUiNotificationSvc.success).toHaveBeenCalledWith('Success', 'Removed from Watchlist');
    });
  });

  describe(`getUser`, () => {
    it(`should call the get method and dispatch an action`, async() => {
      localStorage.setItem('sessionId', ':sessionId');
      let action = {
        type: 'USER_AUTHENTICATED',
        payload: {sessionId: ':sessionId'}
      };
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.url)
          .toEqual('https://api.themoviedb.org/3/account?api_key=60773f18ef6a7a9ee3d4a640fab964eb&session_id=:sessionId');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {sessionId: ':newSessonId'}
        })));
      });
      authService.getUser();
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });

    it(`OnError, should call the get method and dispatch an action with an error`, () => {
        let err = new ResponseError();
        err.status = 404;
        err.statusText = 'something wrong';

        let action = { type: 'USER_LOGGED_OUT' };
        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockError(err);
        });
        authService.getUser();
        expect(mockStore.dispatch).toHaveBeenCalledWith(action);
      });
  });

  describe(`markFav`, () => {
    it(`should call the markFav method and calls uiNotificationSvc when user not Logged in`, async() => {
      authService.markFav();
      expect(mockUiNotificationSvc.warning).toHaveBeenCalledWith('Sorry', 'You need to login to edit records');
    });

    it(`should call the markFav method and generate a notification for favs url disptach an action`, async() => {
      authService.state = {userId: ':userId', sessionId: ':sessionId'};
      spyOn(authService, 'generateNotification');
      let action = {
        type: 'REMOVE_FROM_FAVS',
        payload: ':id'
      };
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.url)
          .toEqual('https://api.themoviedb.org/3/account/:userId/favorite?api_key=60773f18ef6a7a9ee3d4a640fab964eb&session_id=:sessionId');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {sessionId: ':newSessonId'}
        })));
      });
      authService.markFav({id: ':id', favorite: true}, true);
      expect(authService.generateNotification).toHaveBeenCalledWith({id: ':id', favorite: true});
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });

    it(`should call the markFav method and generate a notification for watchList url and disptach an action`, async() => {
      authService.state = {userId: ':userId', sessionId: ':sessionId'};
      spyOn(authService, 'generateNotification');
      let action = {
        type: 'REMOVE_FROM_WATCHLIST',
        payload: ':id'
      };
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.url)
          .toEqual('https://api.themoviedb.org/3/account/:userId/watchlist?api_key=60773f18ef6a7a9ee3d4a640fab964eb&session_id=:sessionId');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {sessionId: ':newSessonId'}
        })));
      });
      authService.markFav({id: ':id', watchList: true}, true);
      expect(authService.generateNotification).toHaveBeenCalledWith({id: ':id', watchList: true});
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe(`authenticateUser`, () => {
    it(`should call the get method and dispatch an action`, async() => {
      let data = {userName: ":userName", password: ":password"};
      let dispatchedData = { request_token: ':token', id: ':userId123', username: ':userNamexxx'};
      let action = { type: 'USER_AUTHENTICATED', payload: dispatchedData };
      let [token, validateToken, newSession, account] = getAuthUserUrls(...[data, 'newToken', 'validateToken', 'newSession', 'account']);
      let requestedConnections = [];
      let responses = {};
      responses[token] = new Response(new ResponseOptions({body: {request_token: ':token', session_id: ':sessionId'} }));
      responses[validateToken] = new Response(new ResponseOptions({body: {session_id: ':sessionId', request_token: ':token'} }));
      responses[newSession] = new Response(new ResponseOptions({body: {session_id: ':sessionId', request_token: ':token'} }));
      responses[account] = new Response(new ResponseOptions({body: dispatchedData }));
      //
      mockBackend.connections.subscribe((connection: MockConnection) => {
        requestedConnections.push(connection);
        connection.mockRespond(responses[connection.request.url]);
      });
      authService.authenticateUser({userName: ':userName', password: ':password'});
      expect(requestedConnections[0].request.url)
        .toEqual(token);
      expect(requestedConnections[1].request.url)
          .toEqual(validateToken);
      expect(requestedConnections[2].request.url)
              .toEqual(newSession);
      expect(requestedConnections[3].request.url)
              .toEqual(account);

      expect(localStorage.getItem('sessionId')).toBe(':sessionId');
      expect(localStorage.getItem('userId')).toBe(':userId123');
      expect(localStorage.getItem('userName')).toBe(':userNamexxx');
      expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    });
    //:TODO for error
    // it(`OnError, should call the get method and dispatch an action with an error`, () => {
    //   let err = new ResponseError();
    //   err.status = 404;
    //   err.statusText = 'something wrong';
    //
    //   let action = { type: 'LOAD_ERROR', payload: err};
    //   mockBackend.connections.subscribe((connection: MockConnection) => {
    //     //requestedConnections.push(connection);
    //
    //     connection.mockError(err);
    //   });
    //   movieService.getPopularMovies(1);
    //   expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    // });
  });
  describe(`getUserMovies`, () => {
    it(`should call the get method and dispatch an action`, async() => {
      localStorage.setItem('userId', ":userId");
      localStorage.setItem('sessionId', ":sessionId");
      let data = {userName: ":userName", password: ":password"};
      let dispatchedData = [
        {results:[{id: ':id', name: ':name'}]},
        {results:[{id: ':id', name: ':name'}]},
        {favIds:[':id']}, {watchIds:[":id"]},
        {userId: ":userId"}
      ];
      let action = { type: 'LOADED_USER_LIST', payload: dispatchedData };
      let [favMovies, watchListMovies, newSession, account] = getAuthUserUrls(...[data, 'favMovies', 'watchListMovies', 'newSession', 'account']);
      let requestedConnections = [];
      let responses = {};
      responses[favMovies] = new Response(new ResponseOptions({body: {results:[{id: ':id', name: ':name'}]} }));
      responses[watchListMovies] = new Response(new ResponseOptions({body: {results:[{id: ':id', name: ':name'}]} }));
      mockBackend.connections.subscribe((connection: MockConnection) => {
        requestedConnections.push(connection);
        connection.mockRespond(responses[connection.request.url]);
      });
      authService.getUserMovies().subscribe(()=>{
        expect(requestedConnections[0].request.url)
          .toEqual(favMovies);
        expect(requestedConnections[1].request.url)
            .toEqual(watchListMovies);
        expect(mockStore.dispatch).toHaveBeenCalledWith(action);
      });
    });

    it(`OnError, should call the get method and dispatch an action with an error`, () => {
      localStorage.setItem('userId', ":userId");
      localStorage.setItem('sessionId', ":sessionId");
      let err = new ResponseError();
      err.status = 404;
      err.statusText = 'something wrong';

      let action = { type: 'LOAD_ERROR', payload: err};
      mockBackend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(err);
      });
      authService.getUserMovies().subscribe(()=>{
        expect(mockStore.dispatch).toHaveBeenCalledWith(action);
      });
    });
  });
});
