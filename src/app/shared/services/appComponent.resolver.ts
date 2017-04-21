import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from './../../user/auth.service';
import { Observable, ObservableInput } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

@Injectable()

export class AppCompResolver implements Resolve<any> {
  userMovies$: Observable<any>;
  constructor(private authSvc: AuthService, private store: Store<any>) {
    //this.userMovies$ = this.store.select('userMovies');
  }

  resolve() { console.log('resolve calling....')
    return this.authSvc.getUserMovies()
    .map(res => res);
  }
}
