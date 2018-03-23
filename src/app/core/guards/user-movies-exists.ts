import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, mergeMap, tap, take } from 'rxjs/operators';
import { IGenres } from '..//models';

import { LoadUserMoviesSuccess } from '../actions/user.entities';
import { LoadGenresSuccess } from '../actions/movies.entities';
import { AuthService } from '../../user/auth.service';
import { State } from '../reducers';
import { getUser } from '../selectors';

@Injectable()
export class UserMoviesExistsGuard implements CanActivate {

  constructor(
    private store: Store<State>,
    private authService: AuthService,
    private router: Router
	) {}

	hasUser(): Observable<boolean> {
		return this.store.select(getUser)
		.pipe(
			map((user) => Boolean(user.userId && user.sessionId) ),
			take(1)
		)
	}
	
	hasMoviesInStore(user): Observable<any> {
		const userId = (user.movies.exists) ? true : false
		return of(userId);
	}

	hasMoviesInApi(user): Observable<any> {
		return this.authService
			.getMovies(user)
			.pipe(
				map((userMovies: any)=> new LoadUserMoviesSuccess(userMovies)),
				switchMap((action) => {
					return this.authService.getGenres()
					.pipe(
						map((res: any) => new LoadGenresSuccess(res.genres)),
						map((genreAction)=> this.store.dispatch(genreAction)),
						map(() => this.store.dispatch(action)),
					)
				}),
				map(Boolean),
				catchError(() => {
          this.router.navigate(['/home']);
          return of(false);
        })
			)
	}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		return this.store.select(getUser)
			.pipe(
				switchMap(user => {
					return this.hasMoviesInStore(user)
					.pipe(
						switchMap((inStore) => {
							if(inStore) {
								return of(inStore)
							}
							else {
								return this.hasMoviesInApi(user);
							}
						})
					)
			 })
			)
  }
}
