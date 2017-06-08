/* tslint:disable:no-unused-variable */
/* global describe:true, it, expect */

/* tslint:disable:no-undef */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Observable } from 'rxjs/Rx';

describe('App: Ng2movies', () => {
  let component: AppComponent,
      mockAuthSvc, mockStore, mockMovieSvc, mockRouter;
  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
    mockRouter.navigate.and.returnValue(Observable.of(false));

    mockStore = jasmine.createSpyObj('mockStore', ['select', 'dispatch']);
    mockStore.dispatch.and.returnValue(Observable.of(false));

    mockAuthSvc = jasmine.createSpyObj('mockAuthSvc', ['getUser', 'logOut']);
    mockAuthSvc.getUser.and.returnValue(false);
    mockAuthSvc.logOut.and.returnValue(false);

    mockMovieSvc = jasmine.createSpyObj('mockMovieSvc', ['searchMovies']);
    mockMovieSvc.searchMovies.and.returnValue(false);
    component = new AppComponent(mockMovieSvc, mockRouter, mockAuthSvc, mockStore);
    //not integrated test..
    // TestBed.configureTestingModule({
    //   declarations: [
    //     AppComponent
    //   ],
    // });
  });

  it(`should call getUser on ngInit`, ()=>{
    component.ngOnInit();
    expect(mockAuthSvc.getUser).toHaveBeenCalled();
  });

  it(`should call searchMovies() when onChange gets called`, ()=>{
    component.onChange(':someMovie');
    expect(mockMovieSvc.searchMovies).toHaveBeenCalled();
  });

  it(`should dispatch an action when resetState() gets called`, ()=>{
    let action = {type: 'RESET_SEARCH'};
    component.resetState();
    expect(mockStore.dispatch).toHaveBeenCalledWith(action);
  });

  it(`should logOut when onLogOut gets called`, ()=>{
    let action = ['home'];
    component.onLogOut(new Event('click'));
    expect(mockAuthSvc.logOut).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(action);
  });
});
