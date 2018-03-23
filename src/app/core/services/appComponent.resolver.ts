import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from './../../user/auth.service';
import { Observable, ObservableInput } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

import { State } from '../reducers';
import { getMovies, getUser } from './../selectors';
@Injectable()

export class AppCompResolver implements Resolve<any> {
  userMovies$: Observable<any>;
  constructor(private authSvc: AuthService, private store: Store<State>) {
    this.userMovies$ = this.store.select(getUser);
  }
  resolve() :Observable<any>{
    return this.authSvc.getUserMovies()
    .map(res => res);
  }
}