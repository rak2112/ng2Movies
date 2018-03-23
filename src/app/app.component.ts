import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { State } from './core/reducers';
import { getMovies, getUser, apiStatus, getSearchedMovies } from './core/selectors';
import * as moviesEntities from './core/actions';

import { Router, NavigationEnd }   from '@angular/router';
import { ISearch, IApi, IUser } from './core/models/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{
  moviesFound$: Observable<ISearch>;
	userDetail$: Observable<IUser>;
	apiStatus$: Observable<IApi>;
  constructor(
      //private movieService: MovieService,
      private router: Router,
      private authSvc: AuthService,
      private store: Store<State>) {
				this.apiStatus$ = store.select(apiStatus);
				this.userDetail$ = store.select(getUser);
        this.moviesFound$ = store.select(getSearchedMovies);
        
  }

  ngOnInit() {
		const user = this.authSvc.getUser(); //TODO: will comeback to revist this approach...
		console.log('userExisits', user);
		if(user) {
			this.store.dispatch(new moviesEntities.UserLoginSuccess(user));
		}
  }

	onChange(movie: string): void { console.log('movcieeeeee to search', movie);
		if(movie) {
			this.store.dispatch(new moviesEntities.TriggerSearch(movie))
		}
  }

  resetState(): void {
    this.store.dispatch(new moviesEntities.ResetSearch());
  }
  onLogOut(event): void {
    event.preventDefault();
    this.authSvc.logOut();
    this.router.navigate(['home']);
  }
}
