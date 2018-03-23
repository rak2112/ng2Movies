import { Action } from '@ngrx/store';

export const LOAD_GENRES_SUCESS = '[ng2Movies] load genres success';
export const LOAD_MOVIES_SUCCESS = '[ng2Movies] load movies success';
export const LOAD_MOVIES_ERROR = '[ng2Movies] load movies error';
export const LOAD_MOVIES = '[ng2Movies] load movies';
export const LOADING_MOVIES = '[ng2Movies] loading movies';
export const FILTER_CHANGED = '[ng2Movies] filter changed';
export const LOAD_MOVIES_BY_YEAR = '[ng2Movies] load movies by year';
export const LOAD_MOVIES_BY_ORDER = '[ng2Movies] load movies by order';
export const LOAD_MOVIES_BY_ADDING_GENRES = '[ng2Movies] load movies by adding genres';
export const LOAD_MOVIES_BY_REMOVING_GENRES = '[ng2Movies] load movies by removing genres';

export const RESET_SEARCH = '[ng2Movies] movies reset search';
export const TRIGGER_MOVIE_SEARCH = '[ng2Movies] movies search triggered';
export const MOVIE_SEARCH_SUCCESS = '[ng2Movies] movie search success';

export class filterChanged implements Action {
	readonly type = FILTER_CHANGED;

	constructor(
		public payload: {
			currentRoute: string,
			pageNo: number,
			selectedFilter: {years: {id: number}, otherFilters:{id:number}, multiSelectors: [{}]},
			currentFilter: {id: number, name: string, type: string}
		}
	){}
}
export class LoadMovies implements Action {
	readonly type = LOAD_MOVIES;

	constructor(
		public payload:{pageNo: number, currentRoute: string}
	){}
}
export class LoadMoviesSuccess implements Action {
	readonly type = LOAD_MOVIES_SUCCESS;

	constructor(public payload) {}
}

export class LoadMoviesError implements Action {
	readonly type = LOAD_MOVIES_ERROR;
	constructor(public errorStatus) {}
}

export class LoadingMovies implements Action {
	readonly type = LOADING_MOVIES;

	constructor() {}
}

export class LoadMoviesByYear implements Action {
	readonly type = LOAD_MOVIES_BY_YEAR;

	constructor(public payload:{}) {}
}

export class LoadMoviesByOrder implements Action {
	readonly type = LOAD_MOVIES_BY_ORDER;

	constructor(public payload) {}
}

export class LoadMoviesByAddingGenres implements Action {
	readonly type = LOAD_MOVIES_BY_ADDING_GENRES;

	constructor(public payload) {}
}

export class LoadMoviesByRemovingGenres implements Action {
	readonly type = LOAD_MOVIES_BY_REMOVING_GENRES;

	constructor(public payload) {}
}

export class TriggerSearch implements Action {
	readonly type = TRIGGER_MOVIE_SEARCH;
	constructor(public movie) {}
}

export class MovieSearchSuccess implements Action {
	readonly type = MOVIE_SEARCH_SUCCESS;
	constructor(public payload: {movie: string, movies: any[]}) {}
}

export class ResetSearch implements Action {
	readonly type = RESET_SEARCH;
	constructor() {}
}

export class LoadGenresSuccess implements Action {
	readonly type = LOAD_GENRES_SUCESS;
	constructor(public payload:any){}
}

export type EntitiesAction =
| LoadMovies
| LoadGenresSuccess
| LoadMoviesSuccess
| LoadMoviesError
| LoadingMovies
| LoadMoviesByYear
| LoadMoviesByOrder
| LoadMoviesByAddingGenres
| LoadMoviesByRemovingGenres
| ResetSearch
|	TriggerSearch
| MovieSearchSuccess;
