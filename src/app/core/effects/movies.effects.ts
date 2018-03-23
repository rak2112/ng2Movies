import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { Action } from '@ngrx/store';
import { catchError, map, tap, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { MovieService } from '../../core/services/movie.service';
import * as moviesEntities from '../actions/movies.entities';
import * as api from '../actions/api';

@Injectable()
export class MoviesEffects {

	@Effect()
	loadMovies$ = this.actions$.ofType(moviesEntities.LOAD_MOVIES)
	.pipe(
		map((action: moviesEntities.filterChanged) => action.payload),
		switchMap((filters)=> {
			return this.movieService['getMovies'](filters)
		}),
		switchMap((res)=> [
			new api.StopLoader(),
			new moviesEntities.LoadMoviesSuccess(res)
		]),
    catchError(err => of(new api.ApiError(err)))
	)


	@Effect()
	filterChanged$ = this.actions$.ofType(moviesEntities.FILTER_CHANGED)
	.pipe(
		map((action: moviesEntities.filterChanged) => action.payload),
		switchMap((filters)=> {
			return of(true)
				.pipe(
					switchMap(()=> of(new api.StopLoader())),
					switchMap(()=> this.movieService['getMovies'](filters)),
					switchMap((result) => [
						new api.StopLoader(),
						new moviesEntities.LoadMoviesSuccess(result)
					])
				)
		})
	)

	@Effect()
	loadSearchedMovies$ = this.actions$.ofType(moviesEntities.TRIGGER_MOVIE_SEARCH)
	.pipe(
		debounceTime(200),
    distinctUntilChanged(),
		map((action: moviesEntities.TriggerSearch) => action.movie),
		switchMap((payload) => { 
			return this.movieService.searchMovies(payload)
			.map((res)=> new moviesEntities.MovieSearchSuccess(res));
		}),
    catchError(err => of(new api.ApiError(err)))
	)

  constructor(
    private actions$: Actions,
    private movieService: MovieService
  ) {}
}
