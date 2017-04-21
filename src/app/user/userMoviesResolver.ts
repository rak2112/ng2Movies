import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, ObservableInput } from 'rxjs/Observable';
// import { Store } from '@ngrx/store';
// import 'rxjs/add/operator/take';

@Injectable()

export class UserMoviesResolver implements Resolve<any> {
  userMovies$: Observable<any>;
  constructor(private authSvc: AuthService) {
    //this.userMovies$ = this.store.select('userMovies');
  }

  resolve() {
    return this.authSvc.getUserMovies()
    .map(res => res);
  }
}
